# Frontend Mentor - Pomodoro app solution

This is a solution to the [Pomodoro app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Bonus challenges](#bonus-challenges-for-myself)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Set a pomodoro timer and short & long break timers
- Customize how long each timer runs for
- See a circular progress bar that represents how far through their timer they are
- Customize the appearance of the app with the ability to set preferences for colors and fonts

### Bonus challenges for myself

Users should also be able to:

- Hear sound effects while interacting with the interface and when the timer finishes
- Toggle sounds on/off
- Be able to navigate the app using a keyboard only
- When using voice over, hear timer status updates once per minute and when starting, pausing, or completing a timer

### Screenshot

![](./screenshots/pomodoro-screenshot.jpg)

### Links

<!-- - Solution URL: [Add solution URL here](https://your-solution-url.com) -->
- Live Site URL: [Pomodoro App](https://pomodoro-matthiassmith.vercel.app)

## My process

### Built with

- Mobile-first workflow
- Semantic HTML5 markup
- CSS custom properties
- CSS animations
- [TypeScript](https://www.typescriptlang.org/) - Static type definitions
- [React](https://reactjs.org/) - JS library
- [Styled Components](https://styled-components.com/) - For styles
- [useSound](https://www.npmjs.com/package/use-sound) - React hook for using sounds
- React Context API - for managing application state

### What I learned

I increased my knowledge and skills with TypeScript, React, and application state during this project's development, but I'd have to say my two main takeaways from doing it are:

1. Building with accessibility in mind by adding it throughout application development is a much better approach than just adding it in at the end. Doing so helped me discover "gotchyas" with my markup and application state earlier on than if I hadn't.
2. Adding sounds to web apps is much easier than I thought it would be, and can be used to raise the user experience to a new level.

    I've always steered away from adding sound effects into web apps because of a sense that they're generally frowned upon, and also because I thought it would be more difficult to do so.
    
    However, what I found here was the opposite. 
    
    For one thing, I personally feel that sound effects add something to this experience — giving it that extra bit of polish and thought. Like when you set a timer and move onto another browser tab to complete some work and your timer expires. Hearing a chime to indicate that it's completed is just the sort of thing that sounds do well while not being overbearing. That being said, I wouldn't use the sounds in an office environment without headphones.
    
    Secondly, adding sounds was a straightforward process, and I was able to do so rather quickly. Finding and choosing sounds on the other hand, took way longer than I care to admit. 😅  

### Useful resources

- [CSS Tricks Progress Ring Tutorial](https://css-tricks.com/building-progress-ring-quickly/) - This article helped me implement the SVG progress ring.
- [MDN article on the "switch" role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role) - Great resource on setting up accessible "switch" controls, which I used for the sound toggle.
- [MDN article on the "progressbar" role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role) - Informative article on the use of the "progressbar" role and its accompanying attributes.
- [Wave's Web Accessibility Evaluation Tool](https://wave.webaim.org/) - This helped me to test my site's accessibility by giving me insights and errors related to accessibility concerns.

## Author

- Website - [My Portfolio](https://portfolio-matthiassmith.vercel.app)
- Frontend Mentor - [@MatthiasSmith](https://www.frontendmentor.io/profile/MatthiasSmith)
- Twitter - [@matthiasdev](https://twitter.com/matthiasdev)

