# TransactionTableCopy

A Google Chrome extension which enables copying transaction tables from financial institution websites.

## Design Philosophies
1. Secure for users
  1. No need to store bank passwords unlike Mint.com, Money Forward, and similar cloud services
  2. Keep money transactions local
2. Simple for developers
  1. Easy-to-implement pluggable translators for various financial institutions (banks, credit cards, securities, etc.)

## Installation

1. Download the [latest TransactionTableCopy zip](https://github.com/hiromu2000/TransactionTableCopy/archive/develop.zip).
2. Go to the extensions page in Chrome, it's a tab on the options page
3. Tick the "Developer mode" checkbox
4. Click "Load unpacked extension" and choose the TransactionTableCopy folder you just unzipped


## Usage

1. Enable the extension.
2. Go and login to your bank websites.
3. Right-click on a transaction table. The transactions can be seen in the option page of this extension.

## To Do

1. Export transactions to csv, ofx, etc.
2. ~~Tests (Jasmine + Karma?)~~
3. Change a trigger action from Context Menu to Page Action.
4. DB schema refactoring

## Contributions

Contributions, especially translators, are welcomed.
Please feel free to make a pull request.

## Test
# Jasmine + PhantomJS (headless testing)
1. Install/build PhantomJS
2. Run this following command:

```
$ phantomjs tests/lib/run-jasmine.js tests/SpecRunner.html
```

# Jasmine + Browser + Web Server
1. Host this repository in your preferred web server (e.g., Apache HTTP Server, Ngix).
2. Open http://localhost/TransactionTableCopy/tests/SpecRunner.html in your preferred browser.

## Credits

1. This project started as a fork from [ColumnCopy](https://github.com/jamesandres/ColumnCopy). 
2. The dynamic plugin loading and the plugin format were inspired from [Zotero](https://www.zotero.org).
3. "Pinstriped Suit" graphic used in promotional images by Alex Berkowitz from SubtlePatterns.com. See: http://subtlepatterns.com/pinstriped-suit/
4. run-jasmine.js is taken from [Here](https://gist.github.com/daniel-chambers/f783d8ef869e64281e98/937d16ba9284cfadb5a7fecd0f08d9f1946a68a0) since the [run-jasmine2.js](https://github.com/ariya/phantomjs/blob/master/examples/run-jasmine2.js) gives me an error.


## License

You may use, modify and distribute TransactionTableCopy freely under the MIT license. See the LICENCE file contained in this project for more details.
