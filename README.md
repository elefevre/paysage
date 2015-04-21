Paysage (alpha - contributors welcome)
=======
### ***Paysage*** *is a visual shared playground for code.* 

![image](paysage-mood-sketch.jpg)

With Paysage kids –and adults!– live code from their own computer, laptops, tablets, phones, using a variety of IDE and editors. 
Pieces of code that we call 'code objects' are send and rendered live on a visual playground, accessible via an URL.

The Paysage project do not try to invent a new IDE or code editor for kids. There is already many editors, with more launching everyday.

Paysage is about making possible a very specific coding experience: 
**Let 10 kids in the same room, with a few more kids online, code together on the same visual playground.**

========
###Demo

[http://paysage.herokuapp.com/boumsplash](http://paysage.herokuapp.com/boumsplash) (a playground named "boumsplash"!)  
[http://paysage.herokuapp.com/programmer.html](http://paysage.herokuapp.com/programmer.html) (the test code editor. It defaults on editing "boumsplash") 

- Open both pages (on several different computers for more fun), 
- Write ProcessingJS code on the programmer, click the button to send the code to the playground. Your code is assigned a unique ID (the editor defaults to 1, but you can change it to anything you want).
- Change the ID to create a new object, or to update a given object.
- Ask a friend to open another [programmer page](http://paysage.herokuapp.com/programmer.html) to code together on the same [playground](http://paysage.herokuapp.com/boumsplash)

(code is saved server-side but only in-memory. No disk or database persistence for now, so code is lost when server is updated)

The demo is continuously deployed from the GitHub repository, so your pull requests are welcome, and will be live in minutes once accepted :-)

========
#### Server, Playground, Editor(s)
The **Paysage server** is a NodeJs / Express app that listen to the programmer page and send code to the renderer using socket.io.
A Python implementation would be interesting for easy local installation. 

The **Paysage playground** (renderer) is a JS HTML CSS page using Processing.js

**Paysage editors** implementations will ideally be in a variety of languages, and could be purely textual editors or visual editors or anything in between. For example :
 - Snap!, Blocky from Google or BlockLanguages could be used to create block-based editors.  
 - A local watcher app for text editors could push code to the Paysage server at each save. 
 - A Paysage editor for babies on tablets, using only shapes to touch would be very cool, too. 
 
*At the moment, we use a simple HTML page as the alpha test editor: [programmer.html](http://paysage.herokuapp.com/programmer.html)*, communicating with the server using socket.io 

======

####Note on the collaborative vision of Paysage:

Paysage do not impose social rules on the users. Anyone can edit everything if they want to! 

Just like writing on Etherpad or Google Docs, users have to evolve their own social rules according to their goals and needs. Yes, pranks and edit wars will happen :-) but it’s part of the process. 

In a sandbox (the real one at the park :-) a kid can destroy the castle another built, and it's the role of other kids and adults to build their own rules about what is allowed and what is not.

In that sense Paysage is also a playground to learn and explore open collaboration.

=======

####TO DO

- [code objects for a playground should be persistent and reloaded from the server](https://github.com/jonathanperret/paysage/issues/5)
- [creating a random unique playground for a group when accessing the home (like etherpad)](https://github.com/jonathanperret/paysage/issues/3)
- [any client editor should be able communicate with the server using a simple HTTP API](https://github.com/jonathanperret/paysage/issues/7)
  - for example [a local script could sync objects and local files](https://github.com/jonathanperret/paysage/issues/14) 
- [a set of 2-4 example 'creatures' that can be added from the alpha editor](https://github.com/jonathanperret/paysage/issues/12)
