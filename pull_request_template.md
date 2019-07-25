# Please check the following:

1. [ ] Don't forget to write JS Doc of the code you changed. Here the most used options and [recipes](https://github.com/documentationjs/documentation/blob/master/docs/RECIPES.md):

- param - input given to a function as an argument. {String} - show the type of param
- returns - output value of a function
- name - explicitly set the documented name of a function, class, or variable
- private - you can use @private to document code and not have it included in the generated
  documentation, maybe it's not part of the public API. There's also @public and @protected
- example - you can use the @example tag to add inline code examples with your documentation

2. [ ] Don't forget to run `npm run docs` to generate updated documentation
