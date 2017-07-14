const TARGET = process.env.npm_lifecycle_event;

if (TARGET === "build") {
 console.log(`Running your build tasks!`);
}

if (TARGET === "dev") {
 console.log(`Running the dev server!`);
}

if (TARGET === "start") {
 console.log(`Running App in production!`);
}
