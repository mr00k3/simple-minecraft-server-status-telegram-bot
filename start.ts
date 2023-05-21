import { Bot } from "grammy";
import { exec } from 'child_process';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const bot = new Bot(config.apiToken);

const executeCommand = () => {
  exec(`netcat -vz ${config.serverIP} ${config.serverPort}`, (error) => {
    if (error) {
      bot.api.sendMessage(config.groupChatID, config.serverDownMessage);
    }
  });
};

//  "executeCommand, 1" means 1 minute, you can change it to "executeCommand, 5" and the minecraft server will be checked if it is online every 5 minutes
setInterval(executeCommand, config.checkInterval * 60 * 1000);

bot.start