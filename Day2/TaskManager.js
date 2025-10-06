class TaskManager {
    createTask(name) {
        console.log(`Creating task: ${name}`);
    }
}

class EmailService {
    sendEmail(to) {
        console.log(`Sending email to ${to}`);
    }
}

const taskManager = new TaskManager();
taskManager.createTask("Finish project"); 

const emailService = new EmailService();
emailService.sendEmail("team@example.com");