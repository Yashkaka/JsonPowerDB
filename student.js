var token = "90933140|-31949318944692763|90951347";
        var dbName = "Student-DB";
        var relName = "Student-Rel"
        resetForm()
        // validates the from by checking if the fields are empty or not
        function validateAndGetFornData() {
            var rollnoVar = $("#roll-no").val();
            // if the rollno field is empty it will give an alert
            if (rollnoVar === "") {
                alert("Roll No is required");
                $("#roll-no").focus();
                return "";
            }
            // if the name field is empty it will give an alert
            var nameVar = $("#name").val();
            if (nameVar === "") {
                alert("Student Name is required");
                $("#name").focus();
                return "";
            }
            // if the class field is empty it will given an alert
            var classn = $("#class").val();
            if (classn === "") {
                alert("Class is required");
                $("#class").focus();
                return "";
            }
            // if the address field is empty it will give an alert
            var address = $("#address").val();
            if (address === "") {
                alert("address is required");
                $("#address").focus();
                return "";
            }
            // if the birthdate field is empty it will give an alert
            var BirthDate = $("#birth-date").val();
            if (BirthDate === "") {
                alert("Birth-Date is required");
                $("#birth-date").focus();
                return "";
            }
            // if the enrollmentdate field is empty it will give an alert
            var EnrollmentDate = $("#enrollment-date").val();
            if (EnrollmentDate === "") {
                alert("Enrollment-Date is required");
                $("#enrollment-date").focus();
                return "";
            }
            // returns jsonobject
            var jsonStrObj = {
                rollno: rollnoVar,
                name: nameVar,
                class: classn,
                address: address,
                BirthDate: BirthDate,
                EnrollmentDate: EnrollmentDate
            }

            return JSON.stringify(jsonStrObj);
        }
        function Updatedata() {
            var jsonStr = validateAndGetFornData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createUPDATERecordRequest(token, jsonStr, dbName, relName, localStorage.getItem("rec_no"));
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
            if (resultObj.status == 200) {
                alert("Data updated Successfully")
            }
            else if (resultObj.status == 401) {
                alert("Invalid Token")
            }
            else if (resultObj.status == 400) {
                alert(" Try again")
            }
            jQuery.ajaxSetup({ async: true });
            resetForm();
        }
        function savetoloavelstorage(resultObj) {
            var data = JSON.parse(resultObj.data)
            localStorage.setItem('rec_no', data.rec_no)
        }
        // resets the form it is invoked when clicked on rest button
        function resetForm() {
            $("#roll-no").val("");
            $("#name").val("").prop("disabled", true);
            $("#class").val("").prop("disabled", true);
            $("#address").val("").prop("disabled", true);
            $("#birth-date").val("").prop("disabled", true);
            $("#enrollment-date").val("").prop("disabled", true);
            $("#roll-no").prop("disabled", false)
            $("#savebutton").prop("disabled", true)
            $("#update").prop("disabled", true)
            $("#reset").prop("disabled", true)
        }
        function enableInput() {
            $("#name").prop("disabled", false);
            $("#class").prop("disabled", false);
            $("#address").prop("disabled", false);
            $("#birth-date").prop("disabled", false);
            $("#enrollment-date").prop("disabled", false);
            $("#reset").prop("disabled", false)

        }
        document.getElementById("roll-no").addEventListener("focusout", function (event) {
            var result=checkrecord()
        })
        function checkrecord() {
            var rollnoVar = $("#roll-no").val();
            if (rollnoVar === "") {
                alert("Student Roll no is required");
                $("#name").focus();
                return "";
            }

            var jsonObj = {
                rollno: rollnoVar
            }
            var jsonStr = JSON.stringify(jsonObj);
            if (jsonStr === "") {
                return;
            }
            var getReqStr = createGET_BY_KEYRequest(token, "Student-DB", "Student-Rel", jsonStr, true, true);
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(getReqStr, "http://api.login2explore.com:5577", "/api/irl");
            if (resultObj.status !=200) {
                $("#savebutton").prop("disabled", false)
                enableInput()
            }
            else{
                $("#savebutton").prop("disabled", true)
                fillData(resultObj)
                return true;
            }
        }
       
        function fillData(resultObj) {
            var data = JSON.parse(resultObj.data);
            var data1 = JSON.stringify(data.record)
            var data2 = JSON.parse(data1)
            $("#roll-no").val(data2.rollno);
            $("#name").val(data2.name);

            $("#class").val(data2.class);
            $("#address").val(data2.address);
            $("#birth-date").val(data2.BirthDate);
            $("#enrollment-date").val(data2.EnrollmentDate);
            jQuery.ajaxSetup({ async: true });
            savetoloavelstorage(resultObj)
            $("#roll-no").prop("disabled", true)
            $("#savebutton").prop("disabled", true)
            $("#reset").prop("disabled", true)
            $("#update").prop("disabled", false)

            enableInput()
        }

        function Savedata() {
            var jsonStr = validateAndGetFornData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createPUTRequest(token, jsonStr, dbName, relName);
            jQuery.ajaxSetup({ async: false });
            var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
            if (resultObj.status == 200) {
                alert("Data added Successfully")
            }
            else if (resultObj.status == 401) {
                alert("Invalid Token")
            }
            else if (resultObj.status == 400) {
                alert("Try again")
            }
            jQuery.ajaxSetup({ async: true });
            resetForm();
        }