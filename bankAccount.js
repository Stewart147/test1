

// BankAccount class
class BankAccount {
    constructor(accountNumber, accountHolder, balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    deposit(amount) {
      this.balance += amount;
      console.log("Amount Deposited:",(amount), "Balance:",this.balance);
     // console.log("Amount Deposited:",(amount1), "Balance:",this.balance);
    //  console.log("Amount Deposited:",(amount2), "Balance:",this.balance);
    }




    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
        } else {
            this.balance -= amount;
           console.log("Amount Withdrawn:",(amount), "Balance:",this.balance);
         //  console.log("Amount Withdrawn:",(amount2), "Balance:",this.balance);
         //  console.log("Amount Withdrawn:",(amount2), "Balance:",this.balance);
           
        }
    }


    checkBalance() {
        console.log("Account Balance:",this.accountHolder, "is",this.balance);
        //console.log("Account Balance:",this.accountHolder, "is",this.balance);
        // console.log("Account Balance:",this.accountHolder, "is",this.balance);
        
        }
    }



export default BankAccount; 






