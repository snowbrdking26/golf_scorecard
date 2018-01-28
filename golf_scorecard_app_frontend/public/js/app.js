const app = angular.module('MyGolfScoreCardApp', []);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    this.url = 'http://localhost:3000'
    // this.addForm = false;
    // this.editModal = false;
    // this.taken = false;
    // this.shortPass = false;
    // this.shortUser = false;
    // this.badLogin = false;
    // this.addMovie = () => {
    //     this.addForm = !this.addForm;
    // }



    // todays date
    // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today)






    $http({
        url: '/session',
        method: 'GET'
    }).then(response => {
        this.user = response.data;
    }, error => {
        // console.log(error.message);
    }).catch(err => console.log(err))





 this.go = () => {
     console.log('=+=+=+=+=+=+=+=')
 }





    // Global Variables
    // this.golfers = [];


    /////// Golfers CRUD ///////

    // ========================
    // GET Route - golfers
    // ========================

    this.getGolfers = () => {
        $http({
            url: this.url + '/golfers',
            method: 'GET'
        }).then(response => {
            this.golfers = response.data // data from rails server
 
        }, error => {
            // console.log(error.message);
        }).catch(err => console.log(err))
    }

    this.getGolfers();


    // ==============
    // CREATE Route - golfers
    // ==============

    this.createForm = {}

    this.processCreateForm = () => {
        $http({
            url: this.url + '/golfers' ,
            method: 'POST',
            data: this.createForm
        }).then(response => {
            this.golfers.push(response.data);
            this.createForm = {};
        }).catch(err => console.log('Catch', err))
    }

    // ==============
    // UPDATE Route - golfers
    // ==============

    this.createForm = {}

    this.processEditForm = (golfer) => {
        console.log(golfer);
        $http({
            url: this.url + '/golfers/' + golfer.id,
            method: 'PUT',
            data: this.createForm
        }).then(response => {
            this.getGolfers();
            this.createForm = {};
            this.toEdit = {}; //clears input field
            this.editModal = false;
        }, error => {
            console.log(error.message);
        }).catch(err => console.log(err))
    }

    // ==============
    // DELETE Route - golfers
    // ==============

    this.deleteGolfer = (id) => {
        console.log(id)
        $http({
            url: this.url + '/golfers/' + id,
            method: 'DELETE'
        }).then(response => {
            this.getGolfers();
        }, error => {
            console.log(error.message);
        }).catch(err => console.log(err))
    }








    ///// scorecards CRUD ///////

    // ========================
    // GET Route - scorecards
    // ========================

    this.getScorecards = () => {
        $http({
            url: this.url + '/scorecards',
            method: 'GET'
        }).then(response => {
            this.scorecards = response.data
            console.log(this.scorecards)
            console.log('array length = ' + this.scorecards.length)
          
        }, error => {
            // console.log(error.message);
        }).catch(err => console.log(err))
    }

    this.getScorecards();     //refreshes list of scorecards









    // https://stackoverflow.com/questions/5223/length-of-a-javascript-object
    // http://www.codeblocq.com/2016/05/Get-the-last-element-of-an-Array-in-JavaScript/

    // =====================
    // CREATE Route - scorecards
    // =====================

    this.createFormScorecards = {}

    this.incrementingRow = (golferID, scorecards) => {
        console.log(golferID)
        console.log(scorecards)

        var scorecardLength = Object.keys(scorecards).length
        // console.log(scorecardLength)
        var createFormScorecards = scorecards[scorecardLength - 1]
        this.createFormScorecards = createFormScorecards
        console.log(this.createFormScorecards)

        createFormScorecards.holenumber++;
        this.createFormScorecards.par = 3
        this.createFormScorecards.score = 3

 

        console.log(golferID)
        $http({
            url: this.url + '/golfers/' + golferID + '/scorecards',
            method: 'POST',
            data: this.createFormScorecards
            // data: { holenumber: lastScorecard.holenumber}
        }).then(response => {
            console.log(response.data)
            this.scorecards.push(response.data);
            console.log(scorecards)

            this.createFormScorecards = {};
            this.getGolfers(); //refreshes golfers & scorecards
        }).catch(err => console.log('Catch', err))
    }






    // =====================
    // CREATE Route - scorecards - start game - prefill data
    // =====================

    // https://stackoverflow.com/questions/9226371/fill-data-in-input-boxes-automatically
    // https://stackoverflow.com/questions/27664654/html-how-to-fill-input-text-on-load

    this.createFormScorecards = {}

    this.startGame = (golferID) => {
        console.log("=======")
        this.createFormScorecards.holenumber = 1;
        this.createFormScorecards.par = 3;
        this.createFormScorecards.score = 3;

        // const values = {
        //     a: 1,
        //     b: 5,
        //     c: 5
        // }

        // const keys = Object.keys(values)
        // const length = keys.length

        // for (let i = 0; i < length; i++) {
        //     const key = keys[i]
        //     document.getElementsByName(key)[0].value = values[key]
        // }

        console.log(golferID)
        $http({
            url: this.url + '/golfers/' + golferID + '/scorecards',
            method: 'POST',
            data: this.createFormScorecards
        }).then(response => {
            console.log(response.data)
            this.scorecards.push(response.data);

            


            this.createFormScorecards = {};
            this.getGolfers(); //refreshes golfers & scorecards
        }).catch(err => console.log('Catch', err))
    }



// //////////////////////////////////


// add class
// remove display class
// jquery add class and remove class
// Display: None

// for in loop 
// pull out each score 
// store in a variable
// 
    // https://stackoverflow.com/questions/17478014/injecting-http-and-scope-into-function-within-controller
    // http://jsfiddle.net/geonunez/pWG2S/
    // https://stackoverflow.com/questions/20460369/adding-and-removing-classes-in-angularjs-using-ng-click



    // $scope.submitAddBtn = "submitAddBtn"
    // $scope.submitAddBtn2 = "displayNone"
    // // change 2nd back to $scope.displayNone = "displayNone"
    // // then in .ejs have only ng-class on <button ng-class="...">

    // $scope.changeClass = function(){

    //     if ($scope.submitAddBtn === "submitAddBtn") {
    //         $scope.submitAddBtn = "displayNone";

    //         $scope.displayNone = "submitAddBtn" 
    //         console.log($scope.displayNone)
    //     } else
    //         $scope.classToChange2 = "blue"
    // };






// ///////////////////////////////////

    // =====================
    // CREATE Route - scorecards
    // =====================

    this.createFormScorecards = {}

    this.processCreateFormScorecards = (golferID) => {
        console.log(golferID)
        $http({
            url: this.url + '/golfers/' + golferID + '/scorecards',
            method: 'POST',
            data: this.createFormScorecards
        }).then(response => {
            console.log(response.data)
            this.scorecards.push(response.data);
            this.createFormScorecards = {};
            this.getGolfers(); //refreshes golfers & scorecards
        }).catch(err => console.log('Catch', err))
    }


    // ==============
    // UPDATE Route - scorecards
    // ==============

    this.createFormScorecards = {}

    this.processEditFormscorecards = (scorecard) => {
        console.log('=======')
        console.log(scorecard)
        console.log('this is scorecard id ' + scorecard.id);
        $http({
            url: this.url + '/scorecards/' + scorecard.id,
            method: 'PUT',
            data: this.createFormScorecards
        }).then(response => {
            this.getGolfers(); //refreshes golfers & scorecards
            this.createFormScorecards = {};
            this.toEditScorecard = {}; //clears input field
            this.editModal = false;
        }, error => {
            console.log(error.message);
        }).catch(err => console.log(err))
    }


    // ==============
    // UPDATE Route - increment score
    // ==============

    // add increment score
    this.incScore = (scorecard) => {
        console.log('id is = ' + scorecard.id)
        console.log('+++++')
        scorecard.score++;

        $http({
            method: 'PUT',
            url: this.url + '/scorecards/' + scorecard.id,
            data: { score: scorecard.score }
            // data: this.createFormScorecards
        }).then(response => {
            console.log(response.data);
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }

    // ==============
    // UPDATE Route - decrement score
    // ==============

    // decrement score
    this.decScore = (scorecard) => {
        console.log('id is = ' + scorecard.id)
        console.log('+++++')
        scorecard.score--;

        $http({
            method: 'PUT',
            url: this.url + '/scorecards/' + scorecard.id,
            data: { score: scorecard.score }
            // data: this.createFormScorecards
        }).then(response => {
            console.log(response.data);
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }

    // ==============
    // UPDATE Route - increment par
    // ==============

    // increment par
    this.incPar = (scorecard) => {
        console.log('id is = ' + scorecard.id)
        console.log('+++++')
        scorecard.par++;

        $http({
            method: 'PUT',
            url: this.url + '/scorecards/' + scorecard.id,
            data: { par: scorecard.par }
            // data: this.createFormScorecards
        }).then(response => {
            console.log(response.data);
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }

    // ==============
    // UPDATE Route - decrement par
    // ==============

    // decrement par
    this.decPar = (scorecard) => {
        console.log('id is = ' + scorecard.id)
        console.log('+++++')
        scorecard.par--;

        $http({
            method: 'PUT',
            url: this.url + '/scorecards/' + scorecard.id,
            data: { par: scorecard.par }
            // data: this.createFormScorecards
        }).then(response => {
            console.log(response.data);
        }, error => {
            console.error(error.message);
        }).catch(err => console.error('Catch: ', err));
    }



    // ==============
    // DELETE Route - scorecards
    // ==============

    this.deleteScorecard = (id) => {
        console.log(id)
        $http({
            url: this.url + '/scorecards/' + id,
            method: 'DELETE'
        }).then(response => {
            this.getGolfers(); //refreshes golfers & scorecards
        }, error => {
            console.log(error.message);
        }).catch(err => console.log(err))
    }

    // ==============
    // Register Route
    // ==============this.getGolfers();

    this.registerUser = (id) => {

        this.shortUser = false;
        this.shortPass = false;
        this.taken = false;

        let pass = true;
        const newUser = {
            'email': `${this.newUserForm.username}@sample.com`,
            'password': this.newUserForm.password
        }


        if (this.newUserForm.username.length < 6) {
            pass = false;
            this.shortUser = true;
        }

        if (this.newUserForm.password.length < 8) {
            pass = false;
            this.shortPass = true;
        }

        if (pass) {
            $http({
                url: this.url + '/auth/',
                method: 'POST',
                data: newUser
            }).then(response => {
                this.user = response.data;
                this.user.name = this.newUserForm.username;
                this.newUserForm = {};
                this.shortPass = false;
                this.shortUser = false;
                this.taken = false;
                closeNav();
            }, error => {
                this.newUserForm = {};
                this.taken = true;
                console.log(error.message);
            }).catch(err => console.log(err))
        }

    }

    this.logout = () => {
        this.user = null;

        $http({
            url: '/session',
            method: 'DELETE',
        }).then(response => {
        }, error => {
            console.log(error.message);
        }).catch(err => console.log(err))
    }

    // ==============
    // Login Route
    // ==============

    this.loginUser = (id) => {

        const user = {
            'email': `${this.loginForm.username}@sample.com`,
            'password': this.loginForm.password
        }

        $http({
            url: this.url + '/auth/sign_in',
            method: 'POST',
            data: user
        }).then(response => {
            this.user = response.data;
            this.user.name = this.loginForm.username;
            this.loginForm = {};
            this.badLogin = false;
            this.shortUser = false;
            this.shortPass = false;
            closeNavLogin();

            $http({
                url: '/session',
                method: 'POST',
                data: this.user
            }).then(response => {

            }, error => {

                console.log(error.message);
            }).catch(err => console.log(err))

        }, error => {
            this.badLogin = true;
            console.log(error.message);
        }).catch(err => console.log(err))
    }

}]);

// ======================
// sidenav functions
// ======================

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function openNavLogin() {
    document.getElementById("mySidenavLogin").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
function closeNavLogin() {
    document.getElementById("mySidenavLogin").style.width = "0";
}


// fetch('http://localhost:3000/scorecards')
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err));



// Links to resources
// https://github.com/a8m/angular-filter#map
// https://justinklemm.com/angularjs-filter-ordering-objects-ngrepeat/
// https://stackoverflow.com/questions/38313260/how-to-display-map-object-content-in-angularjs-ng-repeat?rq=1
// https://stackoverflow.com/questions/14446511/what-is-the-most-efficient-method-to-groupby-on-a-javascript-array-of-objects
// http://www.datchley.name/getting-functional-with-javascript-part-2/
// https://stackoverflow.com/questions/36413159/understanding-nested-for-loops-in-javascript
// https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections
// https://www.w3schools.com/angular/angular_http.asp
// https://www.w3schools.com/angular/tryit.asp?filename=try_ng_http_get
// https://bower.io/
// https://github.com/ajwhite/jquery-scorequotes
// https://docs.npmjs.com/cli/uninstall
// https://www.consolelog.io/group-by-in-javascript

// https://www.learnhowtoprogram.com/rails/building-an-e-commerce-site-with-ajax-and-apis/making-api-calls-in-rails
// https://github.com/joshuaulrich/quantmod/issues/176
// https://stackoverflow.com/questions/2685388/global-javascript-variable-scope-why-doesnt-this-work
// https://stackoverflow.com/questions/15851965/how-to-pass-variable-to-global-scope
// https://stackoverflow.com/questions/31695152/how-to-use-promise-with-two-http-requests
// https://community.smartbear.com/t5/SoapUI-Open-Source/How-can-I-send-multiple-requests-same-request-by-a-for-loop-to/td-p/137555
// https://stackoverflow.com/questions/42627838/sending-multiple-json-requestsload-test-using-soapui/42629015#42629015
// http://jsbin.com/uxukaj/1/edit?js,output
// https://www.quora.com/What-does-the-JavaScript-error-is-not-a-function-mean




// css links
// https://www.w3schools.com/html/html_tables.asp
