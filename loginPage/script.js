
        var x = document.getElementById("login");
        var y = document.getElementById("register");
        var z = document.getElementById("btn");

        function register() {
            x.style.left = "-400px";
            y.style.left = "50px";
            z.style.left = "110px";
        }

        function login() {
            x.style.left = "50px";
            y.style.left = "450px";
            z.style.left = "0px";
        }

        document
            .getElementById("login")
            .addEventListener("submit", function (event) {
                event.preventDefault();
                window.location.href = "landingPage.html";
            });

        document
            .getElementById("register")
            .addEventListener("submit", function (event) {
                event.preventDefault();

                window.location.href = "indexR.html";
            });