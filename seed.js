const {User, Apple, Order, Review, LineItem} = require('./server/db/models');
const db = require('./server/db/db');

const users = [
  {
    id: 1,
    firstName: 'Heather',
    lastName: 'Kopenski',
    email: 'heatherkop320@gmail.com',
    password: 'themyscira',
    isAdmin: true,
    shipping: '542 Main St, New York, NY 10003',
    phone: '981-891-1234'
  },
  {
    id: 2,
    firstName: 'Brittany',
    lastName: 'Chu',
    email: 'brittany@fullstack.com',
    password: 'noodlesnyc',
    isAdmin: true,
    shipping: '111 Noodle Lane, New York, NY 10003',
    phone: '981-891-1234'
  },
  {
    id: 3,
    firstName: 'Claudia',
    lastName: 'Baik',
    email: 'claudiabaik@gmail.com',
    password: '123456',
    isAdmin: true,
    shipping: '246 Magpie Road, New York, NY 10003',
    phone: '981-891-1234'
  },
  {
    id: 4,
    firstName: 'Danielle',
    lastName: 'Howard',
    email: 'danielle@fullstack.com',
    password: 'coloradolife',
    isAdmin: true,
    shipping: '321 Denver St, New York, NY 10003',
    phone: '981-891-1234'
  },
  {
    id: 5,
    firstName: 'Diana',
    lastName: 'Prince',
    email: 'brittany.s.chu@gmail.com',
    password: 'jla4eva',
    isAdmin: false,
    shipping: '88 Themyscira Road, New York, NY 10003',
    phone: '981-891-1234'
  },
]

const apples = [
  {
      id: 1,
      name: 'Fuji',
      image: '/images/red-fuji.png',
      price: 1.50,
      description: 'The Sweetest Apple Around. Fuji apples were developed in the late 1930s by growers at the Tohoku Research Station in Fujisaki, Japan. Fuji apples are a cross between two classic American apple varieties – Red Delicious and Virginia Ralls Janet. Fuji apples were introduced to the United States in the 1960s.',
      stock: 50,
      category: 'red'
  },
  {
      id: 2,
      name: 'Jonagold',
      image: '/images/red-jonaGold.png',
      price: 1,
      description: 'A very popular commercial variety, with a good flavour. Inherits many of the good qualities of its parents Jonathan and Golden Delicious.',
      stock: 5,
      category: 'red'
  },
  {
      id: 3,
      name: 'Gala',
      image: '/images/red-gala.png',
      price: 1,
      description: 'Gala apples have mild sweet and vanilla-like flavors with a floral aroma. This variety is excellent for fresh eating, salads, sauce, pies, and baking.',
      stock: 80,
      category: 'red'
  },
  {
      id: 4,
      name: 'McIntosh',
      image: '/images/red-mcIntosh.png',
      price: 1.25,
      description: 'McIntosh apples are vivid red brushed with bright green, oftentimes speckled with white lenticels (spots). The amount of red or green on the skin of the McIntosh will vary depending on when it was harvested. Early season apples will have more green and later season will sometimes be almost all red.',
      stock: 100,
      category: 'red'
  },
  {
      id: 5,
      name: 'Granny Smith',
      image: '/images/green-grannySmith.png',
      price: 1,
      description: 'Granny Smith apples have a bright green skin that is often speckled with faint white lenticels (spots). Medium to large in size and round in shape, they are a firm and juicy apple with thick skin. Their flesh is bright white and crisp in texture with a tart, acidic, yet subtly sweet flavor.',
      stock: 60,
      category: 'green'
  },
  {
      id: 6,
      name: 'Ginger Gold',
      image: '/images/green-gingerGold.png',
      price: 1,
      description: 'Ginger Gold apples have a pale yellow skin with slight russeting on the surface. They are variable in size, but tend toward conical in shape, sometimes with ribs and long stalks. They have a crisp, cream-colored flesh with a sweet, mildly tart taste. The sweet apple also has a sharp flavor that provides a slight spiciness.',
      stock: 70,
      category: 'green'
  },
  {
      id: 7,
      name: 'Golden Delicious',
      image: '/images/green-goldenDelicious.png',
      price: 1,
      description: 'Golden Delicious apples are pale green to golden yellow in color and speckled with small lenticels (spots). They are small to medium in size, and tend to be conical or oblong in shape. Golden Delicious apples are firm, crisp, and white-fleshed.',
      stock: 85,
      category: 'green'
  },
  {
      id: 8,
      name: 'Mutsu',
      image: '/images/green-mutsu.png',
      price: 1.25,
      description: "A cross between Golden Delicious and Indo, it’s named after the Mutsu Province of Japan, where it was first grown. Mutsu is often sold under its other (more onomatopoeic) name, Crispin. Taste it: One of these oversize green apples can easily feed two people, though its boisterous tang may incline you to keep one all to yourself.",
      stock: 0,
      category: 'green'
  },
]

const orders = [
  {
      id: 1,
      status: 'Completed',
      userId: 5
  },
  {
      id: 2,
      status: 'Processing',
      userId: 4
  },
  {
      id: 3,
      status: 'Created',
      userId: 3
  },
  {
      id: 4,
      status: 'Cancelled',
      userId: 2
  }
]

const lineItems = [
  {
    quantity: 1,
    price: apples[0].price,
    appleId: 1,
    orderId: 1
  },
  {
    quantity: 1,
    price: apples[1].price,
    appleId: 2,
    orderId: 1
  },
  {
    quantity: 1,
    price: apples[0].price,
    appleId: 1,
    orderId: 2
  },
  {
    quantity: 2,
    price: apples[3].price,
    appleId: 4,
    orderId: 3
  },
  {
    quantity: 1,
    price: apples[5].price,
    appleId: 6,
    orderId: 3
  },
  {
    quantity: 1,
    price: apples[5].price,
    appleId: 6,
    orderId: 4
  }
]

const reviews = [
  {
    id: 1,
    text: 'This apple is delicious!',
    subjectField: 'Best ever!',
    userId: 1,
    appleId: 1
  },
  {
    id: 2,
    text: 'This apple is better than all your apples. Try it!',
    subjectField: 'I love it!',
    userId: 2,
    appleId: 2
  },
  {
    id: 3,
    text: 'Give me more of these darn apples because I cannot live without them',
    userId: 3,
    appleId: 3
  },
  {
    id: 4,
    text: "Red Delicious ain't got nothin on this apple. Tell yo friends",
    subjectField: 'Hide yo kids, hide yo wife',
    userId: 5,
    appleId: 5
  }
]

function buildingUsers(){
  return Promise.all(users.map(user => User.create(user)));
}

function buildingApples(){
  return Promise.all(apples.map(apple => Apple.create(apple)));
}

function buildingOrders(){
  return Promise.all(orders.map(order => Order.create(order)));
}

function buildingLineItems(){
  return Promise.all(lineItems.map(item => LineItem.create(item)));
}

function buildingReviews(){
  return Promise.all(reviews.map(review => Review.create(review)));
}

function seed(){
  return buildingUsers()
  .then(() => buildingApples())
  .then(() => buildingOrders())
  .then(() => buildingLineItems())
  .then(() => buildingReviews());
}

console.log('Syncing Database baby');

db.sync({force: true})
.then(() => {
  console.log('Seeding database');
  return seed();
})
.then(() => console.log('Seeding Successful'))
.catch(err => {
  console.error('Error while seeding');
  console.error(err.stack)
})
.finally(() => {
  db.close();
  return null;
})
