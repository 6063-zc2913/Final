
Choose!!1. Raising a virtual plant
Interactivity:
Watering Mechanism: Use buttons to simulate watering. The Arduino detects the input, and p5js displays the effect of the water received by the plant on the screen.
Light adjustment: Use light sensors or knobs to simulate providing light to plants. Plants on the screen can display different growth states based on the amount of "light" they receive.

2. Temperature Sensing Sensor
Interactivity:
Use environmental sensors (such as temperature, humidity or light sensors) to demonstrate changes in the environment. For example, changing the visuals or colors on the screen based on room temperature changes.

3. Social Fear
Interactivity:
Use arduino distance sensor to detect distance. When the distance is too far or no distance is detected, the character is performing a sport or just reading a book; and when the distance is detected, the character disappears from the screen. Simulate the daily life of introverts with sociophobia


12.05 Progress

https://imgpile.com/i/GgwEFF
https://imgpile.com/i/Ggw6lw

What are the interactions? 
· When the user shines light on the photoresistor, a sun icon will appear above the plant. When the user presses the watering button, water droplets will appear above the plant.

Where does data get produced or collected? 
· Data is generated and collected in the photoresistor and button.

How does it get transferred between Arduino and the computer/browser/p5js?
· When the button clicked, and when the light sensor received light.

Who is this for? 
· For those who need companionship.

Would Chris Crawford consider it interactive? 
· I think by his definition this could be considered to have high interactivity. Because the user's actions, such as pressing buttons and flashlight illumination, will cause changes in the state of the plant. Changes in the state of the plant will also cause changes in the user's mood, such as the death of the plant.

How do you plan on testing your project?
· Find two or three users to test, and see whether their plants will die or flowering.

12.13
During this week, I drew the plant animation frame by frame, turned it into a spritesheet and added it to the code. What I will do next week is to draw the watering animation to show the difference, and draw a state for the plants without watering or light.



12.20
I've added two bars to the original code where watering is counted and showed by a blue bar with the water button pressed, and lightning counted and showed by a orange bar with light sensor. My idea is that while both light and water are beneficial for plants, they should be provided in moderation. Therefore, when either bar exceeds the window height, a black and white photo of a dead plant is displayed, indicating overexposure or watering.

This feature was an afterthought following the completion of the original program. I anticipated a straightforward addition of the bars and the display of the plant's death image upon exceeding screen limits. However, unexpected conflicts arose, such as the simultaneous occurrence of the plant dying image and the ongoing watering/light exposure animations.Various unexpected problems always arise during the process of writing code, which is really challenging for me. I am very grateful to the professor for his help.


Why this project important？
· In my project, I've integrated technology with plant care by simulating essential aspects like watering and light exposure. It realistically mirrors plant care through visual bars that monitor these factors. A unique feature is the educational element – when the bars exceed a certain threshold, an image of a dead plant appears, teaching about the delicate balance needed in nurturing plants. This aspect underscores the importance of avoiding both neglect and over-care, illustrating that extremes in plant maintenance can be detrimental.