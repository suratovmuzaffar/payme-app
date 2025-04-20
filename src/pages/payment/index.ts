export function paymentInit() {
  const pageWrapper: HTMLDivElement = document.querySelector('.page-wrapper')!;

  pageWrapper.innerHTML = ` <div>
</div>`;
}

class User {
  username: string;
  password: string;
  cards: Card[];

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.cards = [];
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }
}

class Card {
  cardNumber: string;
  balance: number;

  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
    this.balance = 0;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  transfer(toCard: Card, amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      toCard.deposit(amount);
      return true;
    } else {
      return false;
    }
  }
}

class PaymeApp {
  users: User[];
  currentUser: User | null;

  constructor() {
    this.users = [];
    this.currentUser = null;
  }

  register(username: string, password: string): void {
    if (this.users.find(u => u.username === username)) {
      console.log('Bu login allaqachon band');
      return;
    }
    const newUser = new User(username, password);
    this.users.push(newUser);
    console.log("Ro'yxatdan o'tildi");
  }

  login(username: string, password: string): void {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      console.log('Xush kelibsiz,', username);
    } else {
      console.log("Login yoki parol noto'g'ri");
    }
  }

  logout(): void {
    console.log(this.currentUser?.username, 'chiqib ketdi');
    this.currentUser = null;
  }

  createCard(cardNumber: string): void {
    if (!this.currentUser) return console.log('Avval login qiling');
    const newCard = new Card(cardNumber);
    this.currentUser.addCard(newCard);
    console.log("Yangi karta qo'shildi");
  }

  showCards(): void {
    if (!this.currentUser) return console.log('Login kerak');
    this.currentUser.cards.forEach(card => {
      console.log(`Karta: ${card.cardNumber}, Balans: ${card.balance}`);
    });
  }

  transfer(fromCardNum: string, toCardNum: string, amount: number): void {
    if (!this.currentUser) return console.log('Login qiling');
    const fromCard = this.currentUser.cards.find(c => c.cardNumber === fromCardNum);
    const allCards = this.users.flatMap(u => u.cards);
    const toCard = allCards.find(c => c.cardNumber === toCardNum);

    if (!fromCard || !toCard) {
      return console.log('Kartalardan biri topilmadi');
    }

    const success = fromCard.transfer(toCard, amount);
    console.log(success ? "Pul o'tkazildi" : 'Balans yetarli emas');
  }
}
const app = new PaymeApp();
app.register('ali', '1234');
app.login('ali', '1234');
app.createCard('1111');
app.showCards();

app.register('vali', '4321');
app.login('vali', '4321');
app.createCard('2222');
app.showCards();

app.login('ali', '1234');
app.transfer('1111', '2222', 100); // balans yetarli emas
