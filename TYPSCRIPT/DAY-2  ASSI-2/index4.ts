
interface Printer {
  print(): void;
}

interface Scanner {
  scan(): void;
}

interface Fax {
  fax(): void;
}


class OldPrinter implements Printer {
  print(): void {
    console.log("Printing document...");
  }
}


class SmartPrinter implements Printer, Scanner, Fax {
  print(): void {
    console.log("Printing document...");
  }
  
  scan(): void {
    console.log("Scanning document...");
  }
  
  fax(): void {
    console.log("Faxing document...");
  }
}


const oldPrinter = new OldPrinter();
oldPrinter.print(); 

const smartPrinter = new SmartPrinter();
smartPrinter.print(); 
smartPrinter.scan();  
smartPrinter.fax();   
