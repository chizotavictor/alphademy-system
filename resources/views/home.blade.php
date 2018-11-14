<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Workspace</title>

    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,700">
   
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light" style="background:#FFF">
        <div class="container">
            <a class="navbar-brand" href="#"> <img src="/img/logo.png" style="width:100px;height:50px;" alt=""> </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                 
               
            </ul>
            <div class="form-inline my-2 my-lg-0">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><b>Sign Out</b></button>
            </div>
            </div>
        </div>
    </nav>

    <div class="container" style="margin-top:30px;">
        <h3>Welcome {{ Auth::user()->name }}, </h3>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <h5 class="card-header" style="background-color:green;color:white">System Modules</h5>
                    <div class="card-body">
                         
                        <div class="card-group">
                            <div class="card">
                                <img class="card-img-top" src="/img/sms.png" alt="Management Console">
                                <div class="card-body" style="height:100px"></div>
                                <div class="card-footer" style="background:#c53848">
                                    <h5 class="card-title"><a style="color:white" href="{{ route('management.console') }}" target="_blank">Click to open management console</a></h5>
                                </div>
                            </div>
                            <div class="card">
                                <img class="card-img-top" src="/img/lms.jpg" alt="Learning Management Console">
                                <div class="card-body"></div>
                                <div class="card-footer" style="background-color:#ffb05c">
                                    <h5 class="card-title"><a style="color:white" href="#" target="_blank">Click to open learning management console</a></h5>
                                </div>
                            </div>
                            <div class="card">
                                <img class="card-img-top" src="/img/salessystem.png" alt="Sales Point System Console">
                                <div class="card-body"></div>
                                <div class="card-footer" style="background:#0e303f">
                                    <h5 class="card-title"><a href="#" style="color:white" target="_blank">Click to open sales point system console</a></h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/js/app.js"></script>
</body>
</html>