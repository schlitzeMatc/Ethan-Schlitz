
const greetingMessage = document.getElementById("greeting-message");
const greetingImage = document.querySelector("#greeting-image");
const buttons = document.querySelectorAll(".controls button");

console.log("Selected greeting-message:", greetingMessage);
console.log("Selected greeting-image:", greetingImage);
console.log("Selected all buttons:", buttons);


greetingMessage.textContent = "Welcome to the Dynamic Greeting Card!";


document.getElementById("output").textContent = "This is a safe text output.";

console.log("Original image src:", greetingImage.getAttribute("src"));

greetingImage.setAttribute("title", "Greeting image");
greetingImage.setAttribute("alt", "Updated greeting image");



function setGreeting(type) {
  let message = "";
  let imageSrc = "";

  if (type === "birthday") {
    message = "🎉 Happy Birthday! 🎂";
    imageSrc = "https://media.istockphoto.com/id/1461245017/photo/happy-birthday-party-concept-funny-cute-puppy-dog-border-collie-wearing-birthday-silly.jpg?s=1024x1024&w=is&k=20&c=5kdu3FyujIJcpZi8fo4rUj8IH_g1Zm51FZ_fa81kJQs=";
  } else if (type === "holiday") {
    message = "🎄 Happy Holidays! ⭐";
    imageSrc = "https://cdn.pixabay.com/photo/2017/11/16/08/35/christmas-2953719_1280.jpg";
  } else if (type === "thankyou") {
    message = "🙏 Thank You! 💝";
    imageSrc = "https://media.istockphoto.com/id/1438622722/photo/thank-you-message-on-paper-hanging-with-rope-on-yellow-background.jpg?s=1024x1024&w=is&k=20&c=oyjk_8NuvOv3J7o6pdZKJvXb8ny3J0ubpTKvvmIE828=";
  }

  greetingMessage.textContent = message;
  greetingImage.setAttribute("src", imageSrc);
  console.log(`Set greeting to: ${type}`);
}

function setRandomGreeting() {
  const greetings = [
    { msg: "🎉 Happy Birthday! 🎂", img: "https://media.istockphoto.com/id/1461245017/photo/happy-birthday-party-concept-funny-cute-puppy-dog-border-collie-wearing-birthday-silly.jpg?s=1024x1024&w=is&k=20&c=5kdu3FyujIJcpZi8fo4rUj8IH_g1Zm51FZ_fa81kJQs=" },
    { msg: "🎄 Happy Holidays! ⭐", img: "https://cdn.pixabay.com/photo/2017/11/16/08/35/christmas-2953719_1280.jpg" },
    { msg: "🙏 Thank You! 💝", img: "https://media.istockphoto.com/id/1438622722/photo/thank-you-message-on-paper-hanging-with-rope-on-yellow-background.jpg?s=1024x1024&w=is&k=20&c=oyjk_8NuvOv3J7o6pdZKJvXb8ny3J0ubpTKvvmIE828=" },
  ];

  const random = greetings[Math.floor(Math.random() * greetings.length)];
  greetingMessage.textContent = random.msg;
  greetingImage.setAttribute("src", random.img);
  console.log("Random greeting applied:", random);
}



function personalizeGreeting() {
  const name = prompt("Enter your name:");
  if (name) {
    const personalizedMessage = `A special message for ${name}!`;
    greetingMessage.textContent = personalizedMessage;
    greetingImage.setAttribute("src", "https://media.istockphoto.com/id/1438622722/photo/thank-you-message-on-paper-hanging-with-rope-on-yellow-background.jpg?s=1024x1024&w=is&k=20&c=oyjk_8NuvOv3J7o6pdZKJvXb8ny3J0ubpTKvvmIE828=");
    console.log("Personalized greeting for:", name);
  } else {
    console.log("Personalization cancelled or empty.");
  }
}
