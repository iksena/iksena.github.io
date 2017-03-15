        <!--Guestbook-->
        <script type="text/javascript">
            function showHideGB(){
                var gb = document.getElementById("gb");
                var w = gb.offsetWidth;
                gb.opened ? moveGB(0, 30-w) : moveGB(20-w, 0);
                gb.opened = !gb.opened;
            }
            function moveGB(x0, xf){
                var gb = document.getElementById("gb");
                var dx = Math.abs(x0-xf) > 10 ? 5 : 1;
                var dir = xf>x0 ? 1 : -1;
                var x = x0 + dx * dir;
                gb.style.right = x.toString() + "px";
                if(x0!=xf){setTimeout("moveGB("+x+", "+xf+")", 10);}
            }
        </script>
        <div id="gb">
            <div class="gbtab" onclick="showHideGB()"> </div>
            <div class="gbcontent">
                <div id="cboxdiv" style="position: relative; margin: 0 auto; width: 300px; font-size: 0; line-height: 0;">
                    <div style="position: relative; height: 305px; overflow: auto; overflow-y: auto; -webkit-overflow-scrolling: touch; border:#EDDEDB 0px solid;"><iframe src="//www4.cbox.ws/box/?boxid=3989328&boxtag=wdz495&sec=main" marginheight="0" marginwidth="0" frameborder="0" width="100%" height="100%" scrolling="auto" allowtransparency="yes" name="cboxmain4-3989328" id="cboxmain4-3989328"></iframe></div>
                    <div style="position: relative; height: 75px; overflow: hidden; border:#EDDEDB 0px solid; border-top: 0px;"><iframe src="//www4.cbox.ws/box/?boxid=3989328&boxtag=wdz495&sec=form" marginheight="0" marginwidth="0" frameborder="0" width="100%" height="100%" scrolling="no" allowtransparency="yes" name="cboxform4-3989328" id="cboxform4-3989328"></iframe></div>
                </div>
                <br/>
                Chat with Admin <a href="ymsgr:sendIM?ikomangsena"> <img src="http://opi.yahoo.com/online?u=ikomangsena&amp;m=g&amp;t=1&amp;l=us"/></a>
                <br/><a href="http://my.cbox.ws/ikomangsena" title="Sena Guestbook" target="_blank">Sign My GuestBook</a>
                <a href="javascript:showHideGB()">
                <br/>
                [close]</a>
            </div>
        </div>
        <script type="text/javascript">
            var gb = document.getElementById("gb");
            gb.style.right = (30-gb.offsetWidth).toString() + "px";
        </script>
        <!--End of Guestbook-->

        <footer>
            <div id="clock" class="left footer"></div>
            <div class="right footer">
                Copyright &copy; 2011-<script>
                var date = new Date();
                var year = date.getYear();
                var tahun = (year<1000) ? year+1900 : year;
                document.write(tahun);</script> <a href="/">Sena Aji Buwana</a>
                <br/>Feel free to email me <a href="mailto:sena@ikomangsena.ml">sena@ikomangsena.ml</a>
            </div>
        </footer>

        <script type="text/javascript">
            <!--
            var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            function startTime() {
                var today=new Date(),
                    curr_hour=today.getHours(),
                    curr_min=today.getMinutes(),
                    curr_sec=today.getSeconds();
            curr_hour=checkTime(curr_hour);
                curr_min=checkTime(curr_min);
                curr_sec=checkTime(curr_sec);
                document.getElementById('clock').innerHTML=curr_hour+":"+curr_min+":"+curr_sec+"<br/>"+thisDay + ', ' + day + ' ' + months[month] + ' ' + year;
            }
            function checkTime(i) {
                if (i<10) {
                    i="0" + i;
                }
                return i;
            }
            setInterval(startTime, 500);
            //-->
        </script>