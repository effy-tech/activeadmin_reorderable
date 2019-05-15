$.fn.reorderable = function(opts) {
  // This helper fixes the table row width collapsing when being dragged
  function reorderableTableHelper(e, ui) {
    ui.children().each(function() {
      var $cell = $(this);

      $cell.width($cell.width());
    });

    return ui;
  }

  // This helper sets the table row placeholder height to the height of the row being moved
  function reorderableTableStart(e, ui) {
    ui.placeholder.height(ui.helper.outerHeight());

    return ui;
  }

  function reorderableTableStop(e, ui) {
    var $row    = ui.item,
        $rows   = $row.parent().children('tr'),
        $table  = $row.closest('table'),
        $handle = $row.find('.reorder-handle'),
        token   = $('meta[name=csrf-token]').attr('content'),
        url     = $handle.data('reorder-url'),
        index   = function(i) { return $rows.index(i) + 1; };

    $table.find('tbody tr').each(function(index) {
      var $row     = $(this),
          newClass = ''

      $row.removeClass('odd').removeClass('even');

      if ((index + 1) % 2 == 0) {
        newClass = 'even';
      } else {
        newClass = 'odd';
      }

      $row.addClass(newClass);
    });

    $rows.each(function() {
      $(this).find('.position').text(index($(this)));
    });

    var _post_params = { position: index($row), authenticity_token: token }

    if ($table.hasClass('habtm')){

      var _path = window.location.pathname;

      if (_path.split("/admin/")[1]!=null){
        var _path_components = _path.split('/'),
            _parent_type = _path_components[2],
            _parent_id = _path_components[3];
        if ((_parent_type!=null) && (_parent_id!=null)){
          _post_params['parent_type']=_parent_type;
          _post_params['parent_id']=_parent_id;
        }
      }
    }

    $.post(url, _post_params, function success(_data) {
      if ($table.hasClass('habtm')) { window.location.reload(true); }
    });
  }

  return this.each(function() {
    var opts = $.extend({
      items:  'tbody tr',
      handle: '.reorder-handle',
      axis:   'y',
      helper: reorderableTableHelper,
      start:  reorderableTableStart,
      stop:   reorderableTableStop,
    }, opts || {});

    $(this).sortable(opts);
  });
};

$(function() {
  $('.aa-reorderable').reorderable();
});
