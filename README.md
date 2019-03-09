# minimvc

_minimvc_ is a 2019 version of [Kentarick](github.com/kentaromiura/kentarick), it works on node and on browsers.
Browser compatibility is ie 11 above, which is ok in 2019.

_minimvc_ provides just as little abstraction as it's needed to separate your code, it exports three classes Model, View and Controller.

All of three are just Empty classes extending the same base classes which provides with these methods:

- constructor
- wire
- trigger
- unwire

constuctor
==========
This is where the magic happens, each property passed to the constructor automatically creates a getter and a setter, the setter raise an event with the name of the property after setting it, the event passes an object in the form of {value, previous}

wire
====
wire allows to `wire` to any of the events a class can `trigger`

trigger
=======
a manual trigger for an event.

unwire
======
unwire previously registered events with wire

Little explaination:
--------------------
While any class can listen and react to events,
the best approach I can suggest is to have a _controller_ in which you'll be only using the `trigger` method.

Have your _models_ providing a setter method so that `wire` can make your _views_ listening for that event and updating accordingly.

For complex _views_ that requires more than a single field, you can access the entire wired object from the passed _wired_ property.

You can also `unwire` by calling `unwire` with the same parameters. 
