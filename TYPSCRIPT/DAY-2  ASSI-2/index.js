var TaskManager = /** @class */ (function () {
    function TaskManager() {
    }
    TaskManager.prototype.createTask = function (name) {
        console.log("Creating task: ".concat(name));
    };
    return TaskManager;
}());
var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.prototype.sendEmail = function (to) {
        console.log("Sending email to ".concat(to));
    };
    return EmailService;
}());
var taskManager = new TaskManager();
taskManager.createTask("Finish report");
var emailService = new EmailService();
emailService.sendEmail("example@example.com");
