console.log("A: Starting demo...");
setTimeout(() => 
{
    console.log("B: This runs after 2 seconds (asynchronous).");
}, 2000);
console.log("C: This runs immediately (synchronous).");
const promiseDemo = new Promise((resolve, reject) => 
    {
        const success = true;
        setTimeout(() => 
            {
                success ? resolve("Promise resolved successfully!") : reject("Promise failed!");
            }, 1000);
});

promiseDemo
.then(result => console.log("Promise then:", result))
.catch(error => console.log("Promise catch:", error));


async function asyncDemo() 
{
    try 
    {
        console.log("AsyncDemo: Fetching simulated data...");
        const data = await new Promise(resolve => setTimeout(() => resolve("Data received!"), 1500));
        console.log("AsyncDemo:", data);
    } catch (err) 
    {
        console.log("AsyncDemo error:", err);
    } finally 
    {
        console.log("AsyncDemo complete.");
    }
}

asyncDemo();

fetch("https://dummyjson.com/quotes/random")
.then(response => response.json())
.then(data => console.log("Fetch with .then():", data))
.catch(error => console.log("Fetch error:", error));
async function fetchAsyncExample() {
  try 
  {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    console.log("Fetch with async/await:", data);
  } catch (err) 
  {
    console.log("Async fetch error:", err);
  }
}

fetchAsyncExample();
