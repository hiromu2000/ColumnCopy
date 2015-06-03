  function ColumnCopy() {
    /*
    var that = this;

    chrome.extension.sendRequest({ method: 'getOptions' }, function(response) {
      that.options = $.extend({}, response.options);
      that.init();
    });
    */
  }

  ColumnCopy.prototype.init = function () {
    this.bindHandlers();
  };

  ColumnCopy.prototype.getValuesForTable = function ($table) {
    var that   = this,
        values = [],
        row;

    $('>tr, >thead>tr, >tbody>tr', $table).each(function () {
      row = [];

      $('>td, >th', this).each(function () {
        row.push(that.getCellText(this));
      });

      values.push(row);
    });

    return values;
  };

  /**
   * An similar function to jQuery.text(). This recursively digs through
   * children of a DOM node and retrieves all text nodes and values of relevant
   * form elements.
   *
   * Original concept by James Padolsey.
   * See: http://james.padolsey.com/javascript/replacing-text-in-the-dom-its-not-that-simple/
   */
  ColumnCopy.prototype.getCellText = function (cell) {
    var next, suffix, href, result = [];

    if (cell.nodeType === 1) { // Element node
      if (cell.nodeName === 'INPUT') {
        switch (cell.type) {
          case 'button':
          case 'checkbox':
          case 'file':
          case 'hidden':
          case 'image':
          case 'password':
          case 'radio':
          case 'range':
          case 'reset':
          case 'search':
          case 'submit':
            // Skip these input types, note that TEXTAREA contents are a text node
            // and will be captured by the recursion.
            break;
          default:
            result.push(cell.value);
            break;
        }
      }

      if (cell = cell.firstChild) {
        do {
          next = cell.nextSibling;
          result.push(this.getCellText(cell));
        } while(cell = next);
      }

      if (suffix) {
        result.push(suffix);
      }
    } else if (cell.nodeType === 3) { // Text node
      return cell.data;
    }

    return result.join('');
  };

