# TransactionTableCopy

A Google Chrome extension which enables copying transaction tables from financial institution websites.

## Design Philosophies
1. Secure for users
  1. No need to store bank passwords unlike Mint.com, Money Forward, and similar cloud services
  2. Keep money transactions local
2. Simple for contributors
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
2. Tests (Jasmine + Karma?)
3. Change a trigger action from Context Menu to Page Action.
4. DB schema refactoring

## Contributions

Contributions, especially translators, are welcomed.
Please feel free to make a pull request.

## Credits

1. This project started as a fork from [ColumnCopy](https://github.com/jamesandres/ColumnCopy). 
2. The dynamic plugin loading and the plugin format were inspired from [Zotero](https://www.zotero.org).
3. "Pinstriped Suit" graphic used in promotional images by Alex Berkowitz from SubtlePatterns.com. See: http://subtlepatterns.com/pinstriped-suit/


## License

You may use, modify and distribute TransactionTableCopy freely under the MIT license. See the LICENCE file contained in this project for more details.
