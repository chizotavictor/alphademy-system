<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>ALPHADEMY247 | SIGN IN.</title>

    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,700">
    <link rel="stylesheet" href="/css/vendor.min.css">
    <link rel="stylesheet" href="/css/elephant.min.css">
    <link rel="stylesheet" href="/css/login-2.min.css">
</head>
<body>
<div class="login">
    <div class="login-body">
        <a class="login-brand" href="#">
            <img class="img-responsive" src="/img/logo.png" alt="ALPHADEMY247">
        </a>
        <div class="login-form">
            <form method="POST" action="{{ route('login') }}" aria-label="{{ __('Login') }}" data-toggle="validator">
                @csrf
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" spellcheck="false" autocomplete="off" data-msg-required="Please enter your email address." required>
                    @if ($errors->has('email'))
                        <span class="invalid-feedback" style="color:red" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" class="form-control {{ $errors->has('password') ? ' is-invalid' : '' }}" type="password" name="password" minlength="6" data-msg-minlength="Password must be 6 characters or more." data-msg-required="Please enter your password." required>
                    @if ($errors->has('password'))
                        <span class="invalid-feedback" style="color:red" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>



                <div class="form-group">
                    <label class="custom-control custom-control-primary custom-checkbox">
                        <input class="custom-control-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-label">Keep me signed in</span>
                    </label>
                    <span aria-hidden="true"> · </span>
                    <a href="{{ route('password.request') }}">Forgot password?</a>
                </div>
                <button class="btn btn-primary btn-block" type="submit">Sign in</button>
            </form>
        </div>
    </div>
    <div class="login-footer">
        Don't have an account? <a href="#">Sign Up</a>
    </div>
</div>
<script src="/js/vendor.min.js"></script>
<script src="/js/elephant.min.js"></script>

</body>

</html>
