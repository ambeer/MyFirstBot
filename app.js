var restify = require('restify');
var builder = require('botbuilder');

//Create bot and dialoges

var obj = {
	'Tech360' : 'http://tech360.techaspect.com/Pages/Default.aspx',
	'HRM'  : 'https://hrm.techaspect.com/symfony/web/index.php/auth/login',
	'GitLab'  : 'http://192.168.2.204/',
	'POC'	: 'http://poc.techaspect.com/',
	'UIPractice' : 'http://uipractice.techaspect.com/'    
}

var bot = new builder.BotConnectorBot({ appId: 'TA12344423', appSecret: '1f660f89be924996b3ff5e17286bbed3' });
bot.add('/', new builder.CommandDialog()
	.matches('^Tech360', builder.DialogAction.beginDialog('/Tech360'))
	.matches('^HRM', builder.DialogAction.beginDialog('/HRM'))
	.matches('^GitLab', builder.DialogAction.beginDialog('/GitLab'))
	.matches('^POC', builder.DialogAction.beginDialog('/POC'))
	.matches('^UI', builder.DialogAction.beginDialog('/UI'))	
	.matches('^UIPractice', builder.DialogAction.beginDialog('/UI'))		
    .matches('^quit', builder.DialogAction.endDialog())
	.onDefault([
		function(session, args, next){
			if(!session.userData.name){
				session.beginDialog('/profile');
			}else{
				next();
			}
		},
		function(session, result){
			session.send('Hello %s! Which URL You want Tech360, HRM, GitLab, POC, UIPractice? ', session.userData.name);
		}
	]));

bot.add('/profile',[
	function(session){
		builder.Prompts.text(session, 'Hi! What is your name?');
	},
	function(session, result){
		session.userData.name = result.response;
		session.endDialog();
	}
]);
bot.add('/Tech360',[
	function(session){
		session.send('Click Here: %s', obj['Tech360']);
		session.endDialog();
	}	 
]);
bot.add('/HRM',[
	function(session){
		session.send('Click Here: %s', obj['HRM']);
		session.endDialog();
	}	 
]);
bot.add('/GitLab',[
	function(session){
		session.send('Click Here: %s', obj['GitLab']);
		session.endDialog();
	}	 
]);
bot.add('/POC',[
	function(session){
		session.send('Click Here: %s', obj['POC']);
		session.endDialog();
	}	 
]);
bot.add('/UI',[
	function(session){
		session.send('Click Here: %s', obj['UIPractice']);
		session.endDialog();
	}	 
]);


 
// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});