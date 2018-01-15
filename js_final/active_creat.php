<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="css/all.css">
    <title>3姑6婆</title>
</head>
<body>
    <div id="wrapper">
        <div id="header">
            <a href="index.html"><span>3姑6婆</span></a>
             <span id="username">使用者名稱</span>
        </div>
        <div id="active_container"></div>
        <div id="active_titile_squard"><div id="active_title_word">建立活動</div></div>
        <div id="active_main">
            <div id="active_content_word">
                    <form  method="Post" action="history.php"><br>
                        <div class="form-group row">
                                <label for="a_name" class="col-sm-2 col-form-label">活動名稱</label>
                                <div class="col-sm-8">
                                  <input type="text" class="form-control" id="a_name" placeholder="輸入活動名稱">
                                </div>
                              </div>
                        <div id="active_line"></div><br>
                       <fieldset class="form-group">
                                        <div class="row">
                                          <legend class="col-form-legend col-sm-2">整天</legend>
                                          <div class="col-sm-10">
                                            <div class="form-check">
                                              <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="allday" id="gridRadios1" value="0" checked>是</label>
                                            </div>
                                            <div class="form-check">
                                              <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="allday" id="gridRadios2" value="1">否</label>
                                            </div>
                                          </div>
                                        </div>
                                    </fieldset>                      
                   <fieldset class="form-group">
                                  &nbsp&nbsp&nbsp&nbsp 開始&nbsp&nbsp&nbsp&nbsp<input type="date" name="s_time"><br><br><br>
                                  &nbsp&nbsp&nbsp&nbsp 結束&nbsp&nbsp&nbsp&nbsp<input type="date" name="e_time"><br><br>
                                  <div class="form-group row">
                                <label for="active_name" class="col-sm-2 col-form-label">地點</label>
                                <div class="col-sm-8">
                               
                                  <input type="text" class="form-control" id="active_name" placeholder="輸入地點">
                                </div>
                                &nbsp&nbsp<a href="#" onclick="window.open('googleplace.html', '建議地點', config='height=500,width=800');">建議地點</a>
                              </div>
                                <fieldset class="form-group">
                                        <div class="row">
                                          <legend class="col-form-legend col-sm-2">受邀人回覆是否參加</legend>
                                          <div class="col-sm-10">
                                            <div class="form-check">
                                              <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="invite_reply" id="gridRadios1" value="0" >是</label>
                                            </div>
                                            <div class="form-check">
                                              <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="invite_reply" id="gridRadios2" value="1">否</label>
                                            </div>
                                          </div>
                                        </div>
                                    </fieldset>                      
                             <fieldset class="form-group">
                                        <div class="row">
                                          <legend class="col-form-legend col-sm-2">設定提醒</legend>
                                          <div class="col-sm-10">
                                            <div class="form-check">
                                              <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="alter" id="gridRadios1" value="0" checked>是</label>
                                            </div>
                                            <div class="form-check">
                                              <label class="form-check-label">
                                                <input class="form-check-input" type="radio" name="alter" id="gridRadios2" value="1">否</label>
                                            </div>
                                          </div>
                                        </div>
                                    </fieldset>                      
                            <div id="active_content_summit"><input type="submit" value="確定送出"><br></div> 
                    </form>
            </div>
        </div>
        <?php 
              $a_name = $_POST['a_name'];
              $u_id = $_POST['u_id'];
              $c_id = $_POST['c_id'];
              $allday = $_POST['allday'];
              $s_time = $_POST['s_time'];
              $e_time = $_POST['e_time'];
              $location= $_POST['location'];
              $invite_reply = $_POST['invite_reply'];
              $alert = $_POST['alert'];
              $link = mysqli_connect('localhost', 'root', '', 'js_final');
              mysqli_query($link, 'SET NAMES UTF-8');
              $sql2 = "INSERT INTO activity SET a_name='$a_name', u_id='$u_id', c_id='$c_id', allday='$allday', s_time='$s_time', e_time = '$e_time', location = '$location', invite_reply = '$invite_reply', alert = '$alert';";
              mysqli_query($link, $sql2);
              ?>
</body>
</html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/all.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>