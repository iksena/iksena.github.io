<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
            <!-- WHAT ARE YOU DOING HERE ??? -->
    <head>
        <link href='favicon.ico' rel='shortcut icon'/>
        <title>.:IKSena:.</title>
        <link href="style.css" rel="stylesheet" type="text/css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="I Komang Sena Aji Buwana is a free-time programmer and an ocean engineering student at ITB. This website is about him and his project to make the world a better place.">
        <meta name="author" content="I Komang Sena Aji Buwana">
        <link rel="author" href="https://plus.google.com/u/0/+SenaAjiBuwana"/>
        <meta property="og:url"                content="http://iksena.ml" />
        <meta property="og:type"               content="personal" />
        <meta property="og:title"              content="I Komang Sena Aji Buwana - Personal Website" />
        <meta property="og:description"        content="I Komang Sena Aji Buwana is a free-time programmer and an ocean engineering student at ITB. This website is about him and his project to make the world a better place." />
        <meta property="og:image"              content="http://iksena.ml/logo.gif" />
        <meta name="twitter:card" content="I Komang Sena Aji Buwana is a free-time programmer and an ocean engineering student at ITB. This website is about him and his project to make the world a better place.">
        <meta name="twitter:description" content="I Komang Sena Aji Buwana is a free-time programmer and an ocean engineering student at ITB. This website is about him and his project to make the world a better place.">
        <meta name="twitter:title" content="I Komang Sena Aji Buwana - Personal Website">
        <link rel="alternate" hreflang="en-us">
        <script type="text/javascript">
        <!--
            function expand_collapse(id) {
            var e = document.getElementById(id);
            var f = document.getElementById(id+"_arrows");
            if(e.style.display == 'none'){
                e.style.display = 'block';
                f.innerHTML = '&#9650';
            }
            else {
                e.style.display = 'none';
                f.innerHTML = '&#9660';
            }
            }
        //-->
        </script>
    </head>
    <body>
        <script type="text/javascript">
            function getAge(dateString) {
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            }
        </script>
        <?php include('header.php'); ?>
        <center>
            <fieldset id="About Me" class="tentangkuh">
                <legend align="center"><h1>About Me</h1></legend>
                <b>Nama:</b> I Komang Sena Aji Buwana <br/>
                <b>Nickname:</b> Sena <br/>
                <b>NIM:</b> 15515060 <br/>
                <b>Jurusan:</b> Teknik Kelautan <a href="http://www.ocean.itb.ac.id/" target="_blank">ITB</a><br/>
                <b>Age:</b> <script>document.write(getAge("1997/08/23"));</script> <br/>
                <b>Email:</b> <a href="mailto:ikomangsena@yahoo.co.id">ikomangsena@yahoo.co.id</a> <br/>
                <b>Asal Daerah:</b> Kabupaten Bogor <br/>
                <b>Kemampuan:</b> Java, HTML, CSS, Android Studio, C++, dan FORTRAN<br/>
                <b>Karya:</b>
                <ul>
                    <li><a href="/">Personal Website</a></li>
                    <li><a href="http://www.kostputriundip.cf/" target="_blank">Website Bisnis Kosan</a></li>
                    <li>TwitGue.com (canceled project, web-based twitter client developed with Dabr)</li>
                    <li><a href="https://drive.google.com/open?id=0B6ukXDvipcDjZEo4RXoydzQ0VkE" target="_blank">Aplikasi Gauss-Jordan Elimination for Android</a></li>
                </ul><br/>
                <b>Di ARC mau ngapain?</b><a href="#bukadongbang" id="1_arrows" class="arrows" onclick="expand_collapse('1');">&#9660</a>
                <div id="1" style="display:none;">
                    <center><img id="muka" src="/yoman.jpg" alt="gausah gede gede lah ya" align="middle"/></center>
                    <p style="text-align: justify; text-justify: inter-word;">
                        Saya memiliki hobi programming. 
                        Saya telah membuat projek-projek sederhana membuat aplikasi dan website ketika saya masih duduk di bangku SMP. 
                        Namun, hobi ini baru bangkit kembali ketika saya sudah kuliah dan sayangnya bukan di jurusan Teknik Informatika.
                        Saya ingin memiliki teman-teman yang mau mengerjakan projek bersama dan belajar bersama sesuai dengan hobi saya.
                        Harapan saya, saya bersama teman-teman ARC dapat merintis start-up di kemudian hari nanti.
                    </p>
                </div>
                
            </fieldset>
            <fieldset id="socmed" style="text-align:center;">
                <legend align="center"><h1>Social Media</h1></legend>
                <a href="http://www.facebook.com/senaab" target="_blank"><img src="/SocmedIcon/1467377610_Facebook.png" width="50px" height="50px" alt="Sena Aji Buwana"/></a>
                <a href="http://twitter.com/IKSena_" target="_blank"><img src="/SocmedIcon/1467377623_Twitter.png" width="50px" height="50px" alt="@IKSena_"/></a>
                <a href="http://ikomangsena.blogspot.com/" target="_blank"><img src="/SocmedIcon/1467377606_Blogger.png" width="50px" height="50px" alt="Ikomang Sena"/></a>
                <a href="http://iksena.tumblr.com/" target="_blank"><img src="/SocmedIcon/1467377619_Tumblr.png" width="50px" height="50px" alt="Sena's Journey"/></a>  
                <a href="http://instagram.com/IKSena" target="_blank"><img src="/SocmedIcon/1467377622_Instagram.png" width="50px" height="50px" alt="@IKSena"/></a>
                <a href="http://www.linkedin.com/in/iksena" target="_blank"><img src="/SocmedIcon/1467377656_Linckedin.png" width="50px" height="50px" alt="@IKSena"/></a>
                <a href="http://line.me/ti/p/iksena" target="_blank"><img src="/SocmedIcon/icon256.png" width="50px" height="50px" alt="IKSena"/></a>
            </fieldset>
        </center>
        <br/>
        <?php include('footer.php'); ?> 
    </body>
</html>