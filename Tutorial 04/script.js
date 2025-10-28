// Set up API URL
const apiURL = 'https://jsonplaceholder.typicode.com/users';
let displayData = [];

// Fetch data and handle async operations
const fetchData = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    // Using map, destructuring, and spread operator
    displayData = data.map(({ name, email, phone, website, company }) => ({
      name,
      email,
      phone,
      website,
      company: company.name
    }));

    // Display users on page
    renderUsers(displayData);

    // Test Promise function
    getEmail('Sincere@april.biz')
      .then(message => console.log(message))
      .catch(error => console.error(error));

    // Example of array manipulation
    exampleArrayManipulation();

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Render user cards dynamically
const renderUsers = (users) => {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';

  users.forEach(({ name, email, phone, website, company }) => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    userCard.innerHTML = `
      <strong>${name}</strong><br>
      Email: ${email}<br>
      Phone: ${phone}<br>
      Website: <a href="http://${website}" target="_blank">${website}</a><br>
      Company: ${company}
    `;
    userList.appendChild(userCard);
  });
};

// Promise-based function to find user by email
const getEmail = (email) => {
  return new Promise((resolve, reject) => {
    const user = displayData.find(user => user.email === email);
    if (user) {
      resolve(`User found: ${user.name}, Company: ${user.company}`);
    } else {
      reject('User not found');
    }
  });
};

// Using spread/rest operator to combine user data
const getContactInfo = (...users) => {
  return users.map(({ name, phone, email }) => ({
    name,
    contactInfo: `Phone: ${phone}, Email: ${email}`
  }));
};

// Demonstrate array manipulation
const exampleArrayManipulation = () => {
  // Filter users with company names containing 'Romaguera'
  const filteredUsers = displayData.filter(user =>
    user.company.includes('Romaguera')
  );

  // Map only user names
  const userNames = filteredUsers.map(user => user.name);

  // Reduce to count total users
  const totalUsers = filteredUsers.reduce(count => count + 1, 0);

  console.log(`Filtered User Names: ${userNames.join(', ')}`);
  console.log(`Total Users in Filtered List: ${totalUsers}`);
};

// Initialize data fetching
fetchData();

