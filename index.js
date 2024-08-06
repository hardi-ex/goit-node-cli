import * as contactService from "./contacts.js";
import { Command } from "commander";

const program = new Command();

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list": {
      const contacts = await contactService.listContacts();
      return console.table(contacts);
    }
    case "get": {
      const contact = await contactService.getContactById(id);
      return console.table(contact);
    }
    case "add": {
      const contact = await contactService.addContact(data);
      return console.table(contact);
    }
    case "remove": {
      const contact = await contactService.removeContact(id);
      return console.table(contact);
    }
    default:
      console.log("Unknown action");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const options = program.opts();
invokeAction(options);
