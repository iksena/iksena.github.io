import React, { useState, useEffect, useMemo } from 'react';
import { Wallet, Plus, Settings, CreditCard, Trash2, TrendingUp, Users, LogOut, Calendar, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

// --- Supabase Configuration ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// --- Types ---
// NOTE: Property names are lowercase to match PostgreSQL unquoted column definitions
type Currency = 'IDR' | 'AUD';
type Category = 'Food' | 'Entertainment' | 'Needs' | 'Transport' | 'Uncategorized';
type Spender = 'User 1' | 'User 2' | 'Together';

interface Expense {
  id: string;
  amount: number;
  currency: Currency;
  category: Category;
  spender: Spender;
  description: string;
  date: string;       // SQL: DATE
  householdid: string; // SQL: householdId -> householdid
  createdat: string;   // SQL: createdAt -> createdat
}

interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  currency: Currency;
  category: Category;
  recurrenceday: number; // SQL: recurrenceDay -> recurrenceday
  householdid: string;   // SQL: householdId -> householdid
}

interface Budget {
  id: string;
  category: Category;
  limitidr: number; // SQL: limitIDR -> limitidr
  limitaud: number; // SQL: limitAUD -> limitaud
  householdid: string;
}

interface HouseholdSettings {
  householdid: string; // PK
  user1name: string;   // SQL: user1Name -> user1name
  user2name: string;   // SQL: user2Name -> user2name
}

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", duration: 0.5 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20, height: 0, marginBottom: 0 }
};

// --- Helper Functions ---
const formatCurrency = (amount: number, currency: Currency): string => {
  if (currency === 'IDR') {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      maximumFractionDigits: 0 
    }).format(amount);
  }
  return new Intl.NumberFormat('en-AU', { 
    style: 'currency', 
    currency: 'AUD' 
  }).format(amount);
};

const getMonthName = (dateString: string): string => {
  const date = new Date(dateString + '-01');
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

// --- Components ---

// 1. Login / Passphrase Screen
const LoginScreen = ({ onJoin }: { onJoin: (pass: string) => void }) => {
  const [pass, setPass] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4"
          >
            <Wallet className="w-8 h-8 text-purple-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Enter your shared household passphrase to sync data.</p>
        </div>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && pass.trim() && onJoin(pass.trim())}
          placeholder="Enter passphrase"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none mb-4"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => pass.trim() && onJoin(pass.trim())}
          disabled={!pass.trim()}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Join Household
        </motion.button>
      </motion.div>
    </div>
  );
};

// 2. Add Expense Modal
const AddExpenseModal = ({ 
  onClose, 
  onAdd,
  householdSettings
}: { 
  onClose: () => void; 
  onAdd: (expense: Omit<Expense, 'id' | 'createdat' | 'householdid'>) => void;
  householdSettings: HouseholdSettings;
}) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [category, setCategory] = useState<Category>('Food');
  const [spender, setSpender] = useState<Spender>('User 1');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    onAdd({
      amount: parseFloat(amount),
      currency,
      category,
      spender,
      description,
      date,
    });
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <motion.div 
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <div className="grid grid-cols-2 gap-2">
              {(['IDR', 'AUD'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`py-2 rounded-lg font-medium transition-colors ${
                    currency === curr
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
            >
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Needs">Needs</option>
              <option value="Transport">Transport</option>
              <option value="Uncategorized">Uncategorized</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spender</label>
            <select
              value={spender}
              onChange={(e) => setSpender(e.target.value as Spender)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
            >
              <option value="User 1">{householdSettings.user1name}</option>
              <option value="User 2">{householdSettings.user2name}</option>
              <option value="Together">Together</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Dinner at restaurant"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Add Expense
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// 3. Settings Modal
const SettingsModal = ({ 
  onClose, 
  householdSettings,
  budgets,
  recurringBills,
  onUpdateSettings,
  onUpdateBudget,
  onAddRecurringBill,
  onDeleteRecurringBill,
}: { 
  onClose: () => void;
  householdSettings: HouseholdSettings;
  budgets: Budget[];
  recurringBills: RecurringBill[];
  onUpdateSettings: (settings: HouseholdSettings) => void;
  onUpdateBudget: (category: Category, limitIDR: number, limitAUD: number) => void;
  onAddRecurringBill: (bill: Omit<RecurringBill, 'id' | 'householdid'>) => void;
  onDeleteRecurringBill: (id: string) => void;
}) => {
  const [user1Name, setUser1Name] = useState(householdSettings.user1name);
  const [user2Name, setUser2Name] = useState(householdSettings.user2name);
  const [activeTab, setActiveTab] = useState<'users' | 'budgets' | 'bills'>('users');

  // Budget state
  const [budgetCategory, setBudgetCategory] = useState<Category>('Food');
  const [budgetIDR, setBudgetIDR] = useState('');
  const [budgetAUD, setBudgetAUD] = useState('');

  // Recurring bill state
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billCurrency, setBillCurrency] = useState<Currency>('IDR');
  const [billCategory, setBillCategory] = useState<Category>('Needs');
  const [billDay, setBillDay] = useState('1');

  const handleSaveUsers = () => {
    onUpdateSettings({ 
      ...householdSettings,
      user1name: user1Name, 
      user2name: user2Name 
    });
  };

  const handleSaveBudget = () => {
    if (!budgetIDR && !budgetAUD) return;
    onUpdateBudget(
      budgetCategory,
      parseFloat(budgetIDR) || 0,
      parseFloat(budgetAUD) || 0
    );
    setBudgetIDR('');
    setBudgetAUD('');
  };

  const handleAddBill = () => {
    if (!billName || !billAmount || parseFloat(billAmount) <= 0) return;
    onAddRecurringBill({
      name: billName,
      amount: parseFloat(billAmount),
      currency: billCurrency,
      category: billCategory,
      recurrenceday: parseInt(billDay),
    });
    setBillName('');
    setBillAmount('');
    setBillDay('1');
  };

  const getBudgetForCategory = (cat: Category) => {
    return budgets.find(b => b.category === cat);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <motion.div 
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {['users', 'budgets', 'bills'].map((tab) => (
             <button
             key={tab}
             onClick={() => setActiveTab(tab as 'users' | 'budgets' | 'bills')}
             className={`px-4 py-2 font-medium capitalize relative ${
               activeTab === tab ? 'text-purple-600' : 'text-gray-600 hover:text-gray-800'
             }`}
           >
             {tab === 'recurringBills' ? 'Bills' : tab}
             {activeTab === tab && (
               <motion.div 
                 layoutId="activeTab"
                 className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
               />
             )}
           </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div 
            key="users"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User 1 Name</label>
              <input
                type="text"
                value={user1Name}
                onChange={(e) => setUser1Name(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User 2 Name</label>
              <input
                type="text"
                value={user2Name}
                onChange={(e) => setUser2Name(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveUsers}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Save User Names
            </motion.button>
          </motion.div>
        )}

        {/* Budgets Tab */}
        {activeTab === 'budgets' && (
          <motion.div 
            key="budgets"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Set Budget</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={budgetCategory}
                  onChange={(e) => setBudgetCategory(e.target.value as Category)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="Food">Food</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Needs">Needs</option>
                  <option value="Transport">Transport</option>
                  <option value="Uncategorized">Uncategorized</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IDR Limit</label>
                  <input
                    type="number"
                    value={budgetIDR}
                    onChange={(e) => setBudgetIDR(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">AUD Limit</label>
                  <input
                    type="number"
                    value={budgetAUD}
                    onChange={(e) => setBudgetAUD(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveBudget}
                disabled={!budgetIDR && !budgetAUD}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Save Budget
              </motion.button>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Current Budgets</h3>
              <div className="space-y-2">
                {(['Food', 'Entertainment', 'Needs', 'Transport', 'Uncategorized'] as Category[]).map((cat) => {
                  const budget = getBudgetForCategory(cat);
                  return (
                    <div key={cat} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-700">{cat}</span>
                      <div className="text-right text-sm">
                        {budget ? (
                          <>
                            <div>IDR: {formatCurrency(budget.limitidr, 'IDR')}</div>
                            <div>AUD: {formatCurrency(budget.limitaud, 'AUD')}</div>
                          </>
                        ) : (
                          <span className="text-gray-400">Not set</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recurring Bills Tab */}
        {activeTab === 'bills' && (
          <motion.div 
            key="bills"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Add Recurring Bill</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bill Name</label>
                <input
                  type="text"
                  value={billName}
                  onChange={(e) => setBillName(e.target.value)}
                  placeholder="e.g., Netflix, Rent"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={billCurrency}
                    onChange={(e) => setBillCurrency(e.target.value as Currency)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="IDR">IDR</option>
                    <option value="AUD">AUD</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={billCategory}
                    onChange={(e) => setBillCategory(e.target.value as Category)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Needs">Needs</option>
                    <option value="Transport">Transport</option>
                    <option value="Uncategorized">Uncategorized</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day of Month</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={billDay}
                    onChange={(e) => setBillDay(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddBill}
                disabled={!billName || !billAmount || parseFloat(billAmount) <= 0}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Add Bill
              </motion.button>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Current Bills</h3>
              <div className="space-y-2">
                {recurringBills.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No recurring bills added yet</p>
                ) : (
                  <AnimatePresence>
                    {recurringBills.map((bill) => (
                      <motion.div 
                        key={bill.id} 
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-gray-700">{bill.name}</div>
                          <div className="text-sm text-gray-500">
                            {bill.category} • Day {bill.recurrenceday}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-700">
                            {formatCurrency(bill.amount, bill.currency)}
                          </span>
                          <button
                            onClick={() => onDeleteRecurringBill(bill.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// 4. Main App Component
const ExpenseTracker = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useState<string | null>(null);
  const [householdId, setHouseholdId] = useState<string | null>(null);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [recurringBills, setRecurringBills] = useState<RecurringBill[]>([]);
  const [householdSettings, setHouseholdSettings] = useState<HouseholdSettings>({
    householdid: '',
    user1name: 'User 1',
    user2name: 'User 2',
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');

  // Fetch functions
  const fetchExpenses = async () => {
    if (!householdId) return;
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('householdid', householdId) // Lowercase column name
      .order('date', { ascending: false })
      .order('createdat', { ascending: false }); // Lowercase column name

    if (error) console.error('Error fetching expenses:', error);
    else setExpenses(data || []);
  };

  const fetchBudgets = async () => {
    if (!householdId) return;
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('householdid', householdId); // Lowercase column name

    if (error) console.error('Error fetching budgets:', error);
    else setBudgets(data || []);
  };

  const fetchRecurringBills = async () => {
    if (!householdId) return;
    const { data, error } = await supabase
      .from('recurring_bills')
      .select('*')
      .eq('householdid', householdId); // Lowercase column name

    if (error) console.error('Error fetching recurring bills:', error);
    else setRecurringBills(data || []);
  };

  const fetchHouseholdSettings = async () => {
    if (!householdId) return;
    const { data, error } = await supabase
      .from('household_settings')
      .select('*')
      .eq('householdid', householdId) // Lowercase column name
      .single();

    if (error && error.code !== 'PGRST116') console.error('Error fetching household settings:', error);
    if (data) {
        setHouseholdSettings({ 
            householdid: data.householdid,
            user1name: data.user1name || 'User 1', 
            user2name: data.user2name || 'User 2' 
        });
    }
  };

  // Realtime subscriptions
  useEffect(() => {
    if (!householdId) return;

    const channels: RealtimeChannel[] = [];
    const tables = ['expenses', 'budgets', 'recurring_bills', 'household_settings'];

    tables.forEach(table => {
      // NOTE: Filter string must use lowercase column name (householdid) to match DB
      const channel = supabase.channel(`${table}-changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table, filter: `householdid=eq.${householdId}` }, () => {
          if (table === 'expenses') fetchExpenses();
          if (table === 'budgets') fetchBudgets();
          if (table === 'recurring_bills') fetchRecurringBills();
          if (table === 'household_settings') fetchHouseholdSettings();
        })
        .subscribe();
      channels.push(channel);
    });

    return () => channels.forEach(c => supabase.removeChannel(c));
  }, [householdId]);

  // Initial fetch on authentication
  useEffect(() => {
    if (householdId) {
      (async () => {
        await Promise.all([fetchExpenses(), fetchBudgets(), fetchRecurringBills(), fetchHouseholdSettings()]);
      })();
    }
  }, [householdId]);

  // Authentication
  const handleJoinHousehold = async (passphrase: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
      if (authError) throw authError;
      if (authData.user) {
        setUserId(authData.user.id);
        setHouseholdId(passphrase);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error joining household:', error);
      alert('Authentication failed.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserId(null);
    setHouseholdId(null);
    setExpenses([]);
    setBudgets([]);
    setRecurringBills([]);
    setHouseholdSettings({ householdid: '', user1name: 'User 1', user2name: 'User 2' });
  };

  // CRUD operations
  const handleAddExpense = async (expense: Omit<Expense, 'id' | 'createdat' | 'householdid'>) => {
    if (!householdId) return;
    const { error } = await supabase.from('expenses').insert({ 
        ...expense, 
        householdid: householdId, // Lowercase column name
        createdat: new Date().toISOString() // Lowercase column name
    });
    if (error) alert('Failed to add expense.');
  };

  const handleDeleteExpense = async (id: string) => {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) alert('Failed to delete expense.');
  };

  const handleUpdateSettings = async (settings: HouseholdSettings) => {
    if (!householdId) return;
    const { error } = await supabase.from('household_settings').upsert({ 
        householdid: householdId, 
        user1name: settings.user1name,
        user2name: settings.user2name
    }, { onConflict: 'householdid' });
    if (error) alert('Failed to update settings.');
  };

  const handleUpdateBudget = async (category: Category, limitIDR: number, limitAUD: number) => {
    if (!householdId) return;
    
    // Using UPSERT directly thanks to UNIQUE(householdId, category) constraint
    const { error } = await supabase.from('budgets').upsert({
        householdid: householdId, // Lowercase
        category,
        limitidr: limitIDR, // Lowercase column name
        limitaud: limitAUD  // Lowercase column name
    }, { onConflict: 'householdid, category' });

    if (error) {
        console.error('Error upserting budget', error);
        alert('Failed to save budget.');
    }
  };

  const handleAddRecurringBill = async (bill: Omit<RecurringBill, 'id' | 'householdid'>) => {
    if (!householdId) return;
    const { error } = await supabase.from('recurring_bills').insert({ 
        ...bill, 
        householdid: householdId 
    });
    if (error) alert('Failed to add recurring bill.');
  };

  const handleDeleteRecurringBill = async (id: string) => {
    const { error } = await supabase.from('recurring_bills').delete().eq('id', id);
    if (error) alert('Failed to delete recurring bill.');
  };

  // Computed values
  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const monthMatch = exp.date.startsWith(selectedMonth);
      const categoryMatch = filterCategory === 'All' || exp.category === filterCategory;
      return monthMatch && categoryMatch;
    });
  }, [expenses, selectedMonth, filterCategory]);

  const totalsByCategory = useMemo(() => {
    const totals: Record<Category, { IDR: number; AUD: number }> = {
      Food: { IDR: 0, AUD: 0 },
      Entertainment: { IDR: 0, AUD: 0 },
      Needs: { IDR: 0, AUD: 0 },
      Transport: { IDR: 0, AUD: 0 },
      Uncategorized: { IDR: 0, AUD: 0 },
    };
    filteredExpenses.forEach(exp => totals[exp.category][exp.currency] += exp.amount);
    return totals;
  }, [filteredExpenses]);

  const totalsBySpender = useMemo(() => {
    const totals: Record<Spender, { IDR: number; AUD: number }> = {
      'User 1': { IDR: 0, AUD: 0 },
      'User 2': { IDR: 0, AUD: 0 },
      'Together': { IDR: 0, AUD: 0 },
    };
    filteredExpenses.forEach(exp => totals[exp.spender][exp.currency] += exp.amount);
    return totals;
  }, [filteredExpenses]);

  const grandTotals = useMemo(() => {
    return {
      IDR: filteredExpenses.filter(exp => exp.currency === 'IDR').reduce((sum, exp) => sum + exp.amount, 0),
      AUD: filteredExpenses.filter(exp => exp.currency === 'AUD').reduce((sum, exp) => sum + exp.amount, 0),
    };
  }, [filteredExpenses]);

  const handlePreviousMonth = () => {
    const date = new Date(selectedMonth + '-01');
    date.setMonth(date.getMonth() - 1);
    setSelectedMonth(date.toISOString().slice(0, 7));
  };

  const handleNextMonth = () => {
    const date = new Date(selectedMonth + '-01');
    date.setMonth(date.getMonth() + 1);
    setSelectedMonth(date.toISOString().slice(0, 7));
  };

  const getBudgetForCategory = (cat: Category) => {
    return budgets.find(b => b.category === cat);
  };

  if (!isAuthenticated) {
    return <LoginScreen onJoin={handleJoinHousehold} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          
          {/* Month Selector */}
          <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <button onClick={handlePreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-800">{getMonthName(selectedMonth)}</h2>
              </div>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Total Spent</h3>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(grandTotals.IDR, 'IDR')}</p>
                <p className="text-lg font-semibold text-gray-600">{formatCurrency(grandTotals.AUD, 'AUD')}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Transactions</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{filteredExpenses.length}</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">By Spender</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{householdSettings.user1name}:</span>
                  <span className="font-semibold">
                    {formatCurrency(totalsBySpender['User 1'].IDR, 'IDR')} / {formatCurrency(totalsBySpender['User 1'].AUD, 'AUD')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{householdSettings.user2name}:</span>
                  <span className="font-semibold">
                    {formatCurrency(totalsBySpender['User 2'].IDR, 'IDR')} / {formatCurrency(totalsBySpender['User 2'].AUD, 'AUD')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Together:</span>
                  <span className="font-semibold">
                    {formatCurrency(totalsBySpender['Together'].IDR, 'IDR')} / {formatCurrency(totalsBySpender['Together'].AUD, 'AUD')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Category Breakdown */}
          <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['Food', 'Entertainment', 'Needs', 'Transport', 'Uncategorized'] as Category[]).map((cat) => {
                const budget = getBudgetForCategory(cat);
                const spent = totalsByCategory[cat];
                // using limitidr/limitaud lowercase property names
                const percentIDR = budget && budget.limitidr > 0 ? (spent.IDR / budget.limitidr) * 100 : 0;
                const percentAUD = budget && budget.limitaud > 0 ? (spent.AUD / budget.limitaud) * 100 : 0;

                return (
                  <div key={cat} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{cat}</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">IDR</span>
                          <span className="font-medium">{formatCurrency(spent.IDR, 'IDR')}</span>
                        </div>
                        {budget && budget.limitidr > 0 && (
                          <>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(percentIDR, 100)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-2 rounded-full ${
                                  percentIDR > 90 ? 'bg-red-500' : percentIDR > 70 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Budget: {formatCurrency(budget.limitidr, 'IDR')}
                            </p>
                          </>
                        )}
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">AUD</span>
                          <span className="font-medium">{formatCurrency(spent.AUD, 'AUD')}</span>
                        </div>
                        {budget && budget.limitaud > 0 && (
                          <>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(percentAUD, 100)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-2 rounded-full ${
                                  percentAUD > 90 ? 'bg-red-500' : percentAUD > 70 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Budget: {formatCurrency(budget.limitaud, 'AUD')}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Filter and Add Button */}
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as Category | 'All')}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
              >
                <option value="All">All Categories</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Needs">Needs</option>
                <option value="Transport">Transport</option>
                <option value="Uncategorized">Uncategorized</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Expense
            </motion.button>
          </motion.div>

          {/* Expenses List */}
          <div className="space-y-4">
            
            {/* Mobile View: Cards (Visible on block, hidden on md) */}
            <div className="block md:hidden space-y-4">
               <AnimatePresence>
                 {filteredExpenses.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 text-gray-400 bg-white rounded-xl shadow-sm">
                      No expenses found
                    </motion.div>
                  ) : (
                    filteredExpenses.map((expense) => (
                      <motion.div 
                        key={expense.id} 
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-gray-800">{expense.description || 'No Description'}</div>
                            <div className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800">{formatCurrency(expense.amount, expense.currency)}</div>
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                              {expense.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {expense.spender === 'User 1' ? householdSettings.user1name : 
                             expense.spender === 'User 2' ? householdSettings.user2name : 
                             'Together'}
                          </div>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
               </AnimatePresence>
            </div>

            {/* Desktop View: Table (Hidden on block, visible on md) */}
            <motion.div variants={fadeIn} className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spender</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <AnimatePresence mode="popLayout">
                    {filteredExpenses.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                          No expenses found for this period
                        </td>
                      </tr>
                    ) : (
                      filteredExpenses.map((expense) => (
                        <motion.tr 
                          key={expense.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(expense.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {expense.description || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {expense.spender === 'User 1' ? householdSettings.user1name : 
                             expense.spender === 'User 2' ? householdSettings.user2name : 
                             'Together'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right text-gray-800">
                            {formatCurrency(expense.amount, expense.currency)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button
                              onClick={() => handleDeleteExpense(expense.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </main>

      {/* Modals wrapped in AnimatePresence */}
      <AnimatePresence>
        {showAddModal && (
          <AddExpenseModal
            key="add-modal"
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddExpense}
            householdSettings={householdSettings}
          />
        )}

        {showSettings && (
          <SettingsModal
            key="settings-modal"
            onClose={() => setShowSettings(false)}
            householdSettings={householdSettings}
            budgets={budgets}
            recurringBills={recurringBills}
            onUpdateSettings={handleUpdateSettings}
            onUpdateBudget={handleUpdateBudget}
            onAddRecurringBill={handleAddRecurringBill}
            onDeleteRecurringBill={handleDeleteRecurringBill}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseTracker;