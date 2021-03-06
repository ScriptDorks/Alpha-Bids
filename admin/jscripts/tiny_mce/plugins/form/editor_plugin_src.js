/* Import plugin specific language pack */
tinyMCE.importPluginLanguagePack('form', 'en');

function TinyMCE_form_initInstance(inst) {
 // Hopefully adding these here will prevent questions
 tinyMCE.defParam['valid_elements'] += ""
  +"-fieldset[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress"
   +"|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style"
   +"|title],"
  +"-form[accept|accept-charset|action|class|dir<ltr?rtl|enctype|id|lang"
   +"|method<get?post|name|onclick|ondblclick|onkeydown|onkeypress|onkeyup"
   +"|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onreset|onsubmit"
   +"|style|title|target],"
  +"-input[accept|accesskey|align<bottom?left?middle?right?top|alt"
   +"|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang"
   +"|maxlength|name|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress"
   +"|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onselect"
   +"|readonly<readonly|size|src|style|tabindex|title"
   +"|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text"
   +"|usemap|value],"
  +"-label[accesskey|class|dir<ltr?rtl|for|id|lang|onblur|onclick|ondblclick"
   +"|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout"
   +"|onmouseover|onmouseup|style|title],"
  +"-legend[align<bottom?left?right?top|accesskey|class|dir<ltr?rtl|id|lang"
   +"|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
   +"|onmouseout|onmouseover|onmouseup|style|title],"
  +"-option[class|dir<ltr?rtl|disabled<disabled|id|label|lang|onclick|ondblclick"
   +"|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout"
   +"|onmouseover|onmouseup|selected<selected|style|title|value],"
  +"-select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name"
   +"|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup"
   +"|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|size|style"
   +"|tabindex|title],";
}

/**
 * Returns the HTML contents of the form control.
 */
function TinyMCE_form_getControlHTML(control_name) {
 var controls = new Array(
  ['form', 'newform.png', '{$lang_form_desc}', 'mceInsertForm', true],
  ['property', 'property.png', '{$lang_form_property_desc}', 'mceFormTextBox', true],
  ['select', 'form_select.gif', '{$lang_form_select_desc}', 'mceFormSelect', true],
  ['textbox', 'form_textbox.gif', '{$lang_form_textbox_desc}', 'mceFormTextBox', true],
  ['checkbox', 'form_checkbox.gif', '{$lang_form_checkbox_desc}', 'mceFormCheckBox', true],
  ['radio', 'form_radio.gif', '{$lang_form_radio_desc}', 'mceFormRadio', true],
  ['password', 'password.png', '{$lang_form_password_desc}', 'mceFormPassword',true],
  ['hidden', 'form_hidden.gif', '{$lang_form_hidden_desc}', 'mceFormHidden', true],
  ['submit', 'submit.png', '{$lang_form_submit_desc}', 'mceFormSubmit', true],
  ['reset', 'reset.png', '{$lang_form_reset_desc}', 'mceFormReset', true],
  ['file', 'file.png', '{$lang_form_file_desc}', 'mceFormFile', true],
  ['button', 'button.png', '{$lang_form_button_desc}', 'mceFormButton', true]
  );
  /* opting to not incorporate these
  ['textarea', 'form_textarea.gif', '{$lang_form_textarea_desc}', 'mceFormTextArea'],
  ['image', 'form_image.gif', '{$lang_form_image_desc}', 'mceFormFile', true],
  ['legend', 'form_legend.gif', '{$lang_form_legend_desc}', 'mceFormLegend', true]
  */

 // Render form control
 for (var i=0; i<controls.length; i++) {
  // set loop vars
  var but = controls[i];
  var safariPatch = '" onclick="';
  // patch for Safari
  if (tinyMCE.isSafari)
   safariPatch = "";

  if (but[0] == control_name && (tinyMCE.isMSIE || !tinyMCE.settings['button_tile_map']))
   return '<img id="{$editor_id}_' + but[0] + '" src="{$pluginurl}/images/' + but[1] + '" title="' + but[2] + '" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');' + safariPatch + 'tinyMCE.execInstanceCommand(\'{$editor_id}\',\'' + but[3] + '\', ' + (but.length > 4 ? but[4] : false) + (but.length > 5 ? ', \'' + but[5] + '\'' : '') + ')">';
  else if (but[0] == control_name)
   return '<img id="{$editor_id}_' + but[0] + '" src="{$themeurl}/images/spacer.gif" style="background-image:url({$pluginurl}/images/buttons.gif); background-position: ' + (0-(i*20)) + 'px 0px" title="' + but[2] + '" width="20" height="20" class="mceButtonDisabled" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');' + safariPatch + 'tinyMCE.execInstanceCommand(\'{$editor_id}\',\'' + but[3] + '\', ' + (but.length > 4 ? but[4] : false) + (but.length > 5 ? ', \'' + but[5] + '\'' : '') + ')">';
 }
 
 // Special formcontrols
 if (control_name == "formcontrols") {
  var html = ""
   + tinyMCE.getControlHTML("form")
   + tinyMCE.getControlHTML("property")
   + tinyMCE.getControlHTML("separator")
   + tinyMCE.getControlHTML("select")
   + tinyMCE.getControlHTML("checkbox")
   + tinyMCE.getControlHTML("radio")
   + tinyMCE.getControlHTML("separator")
   + tinyMCE.getControlHTML("textbox")
   + tinyMCE.getControlHTML("password")
   + tinyMCE.getControlHTML("hidden")
   + tinyMCE.getControlHTML("separator")
   + tinyMCE.getControlHTML("submit")
   + tinyMCE.getControlHTML("reset")
   + tinyMCE.getControlHTML("button")
   + tinyMCE.getControlHTML("separator")
   + tinyMCE.getControlHTML("file");
  /* opting out of these
  html += tinyMCE.getControlHTML("textarea");
  html += tinyMCE.getControlHTML("image");
  html += tinyMCE.getControlHTML("legend");
  */
  return html;
 }
 return "";
}

/**
 * Executes the form commands.
 */
function TinyMCE_form_execCommand(editor_id, element, command, user_interface, value) {
 var inst = tinyMCE.getInstanceById(editor_id);
 var focusElm = inst.getFocusElement();
 var formElm = tinyMCE.getParentElement(focusElm, "form");
 var doc = inst.contentWindow.document;
 
 // ------- Inner functions ---------
 function CallCorrectUpdate(ftype) {
  switch (ftype) {
   case "text":
    tinyMCE.execCommand("mceFormTextBox", user_interface, value);
    break;
   case "checkbox":
    tinyMCE.execCommand("mceFormCheckBox", user_interface, value);
    break;
   case "radio":
    tinyMCE.execCommand("mceFormRadio", user_interface, value);
    break;
   case "password":
    tinyMCE.execCommand("mceFormPassword", user_interface, value);
    break;
   case "hidden":
    tinyMCE.execCommand("mceFormHidden", user_interface, value);
    break;
   case "submit":
    tinyMCE.execCommand("mceFormSubmit", user_interface, value);
    break;
   case "reset":
    tinyMCE.execCommand("mceFormReset", user_interface, value);
    break;
   case "file":
    tinyMCE.execCommand("mceFormFile", user_interface, value);
    break;
   case "button":
    tinyMCE.execCommand("mceFormButton", user_interface, value);
    break;
  };
 };
 
 function TextToBool(text) {
  if (text == "true") return true;
  return false;
 };
 
 function BoolToText(bool) {
  if (typeof(bool) != "boolean") return "false";
  if (bool) return "true";
  return "false";
 };
 
 // ---- Commands -----
 
 // Handle commands
 switch (command) {
  case "mceInsertForm":
   var form_name = "myform",
       form_id = "myform",
       form_action = "http://my.cgi/script",
       form_method = "post",
       form_enctype = "application/x-www-form-urlencoded",
       action = "insert",
       className = "";
       
   if (user_interface) {
    
    tinyMCE.formElm = tinyMCE.getParentElement(inst.getFocusElement(), "form");
    
    if (tinyMCE.formElm && value != "insert") {
     form_name = tinyMCE.getAttrib(tinyMCE.formElm, 'name', form_name);
     form_id = tinyMCE.getAttrib(tinyMCE.formElm, 'id', form_id);
     form_action = tinyMCE.getAttrib(tinyMCE.formElm, 'action', form_action);
     form_method = tinyMCE.getAttrib(tinyMCE.formElm, 'method', form_method);
     form_enctype = tinyMCE.getAttrib(tinyMCE.formElm, 'enctype', form_enctype);
     className = tinyMCE.getVisualAidClass(tinyMCE.getAttrib(tinyMCE.formElm, 'class'),
                 false);
     
     action = "update";
    }
    
    // Setup template
    var template = new Array();
    
    template['file'] = '../../plugins/form/form.htm';
    template['width'] = 680;
    template['height'] = 220;
    template['scrollbars'] = "yes";
    template['resizable'] = "yes";
    
    // Open window
    tinyMCE.openWindow(template, {editor_id : inst.editorId,
                                  form_name : form_name ,
                                  form_id : form_id,
                                  form_action : form_action ,
                                  form_method : form_method ,
                                  form_enctype : form_enctype,
                                  action : action,
                                  scrollbars : "yes",
                                  resizable : "yes",
                                  className : className});
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     form_name = value['form_name'];
     form_id = value['form_id'];
     form_action = value['form_action'];
     form_method = value['form_method'];
     form_enctype = value['form_enctype'];
     className = value['className'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     tinyMCE.setAttrib(tinyMCE.formElm, 'name', form_name);
     tinyMCE.setAttrib(tinyMCE.formElm, 'id', form_id);
     tinyMCE.setAttrib(tinyMCE.formElm, 'action', form_action);
     tinyMCE.setAttrib(tinyMCE.formElm, 'method', form_method);
     tinyMCE.setAttrib(tinyMCE.formElm, 'enctype', form_enctype);
     tinyMCE.setAttrib(tinyMCE.formElm, 'class', className);
     tinyMCE.handleVisualAid(tinyMCE.formElm, false, inst.visualAid);
     // Fix for stange MSIE align bug
     tinyMCE.formElm.outerHTML = tinyMCE.formElm.outerHTML;
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new form
    html += '<form name="' + form_name + '" ';
    
    if (form_enctype)
     html += 'enctype="' + form_enctype + '" ';
    
    if (form_id)
     html += 'id="' + form_id + '" ';
    
    if (form_action)
     html += 'action="' + form_action + '" ';
    
    if (form_method)
     html += 'method="' + form_method + '" ';
    
    if (className)
     html += 'class="' + className + '" ';
    
    html += '>&nbsp;';
    
    // probably want to insert the submit button
    html += "<input type=submit name='S1' value='Submit Query'>";
    
    html += "&nbsp;</form>&nbsp;";
    
    inst.execCommand('mceInsertContent', false, html);
    tinyMCE.handleVisualAid(inst.getBody(), true, tinyMCE.settings['visual']);
   }
   return true;
  break;
  
  case "mceFormSelect":
   if (!formElm) { return true; };
    var field_name = "myselect",
        field_size = 0,
        field_multiple = "false",
        field_disa = "false",
        field_optarr = [],
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "select");
    
    if (tinyMCE.fieldElm && value != "insert") {
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'name', field_name);
     field_size = tinyMCE.getAttrib(tinyMCE.fieldElm, 'size', field_size);
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     field_multiple = tinyMCE.fieldElm.multiple ? "true" : "false";

     if (tinyMCE.fieldElm.hasChildNodes()) {
      var cn = tinyMCE.fieldElm;
      for (var i=0; i<cn.childNodes.length; i++) {
       field_optarr[i] = [];
       if (cn.childNodes[i].selected) {
        field_optarr[i]['selected'] = 1;
       } else {
        field_optarr[i]['selected'] = 0;
       };
       field_optarr[i]['optname'] = cn.childNodes[i].innerHTML;
       field_optarr[i]['optval'] = cn.childNodes[i].value;
      };
     };
     className = tinyMCE.getVisualAidClass(tinyMCE.getAttrib(tinyMCE.fieldElm, 'class'),
                 false);
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
     template['file'] = '../../plugins/form/select.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;
    
    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_name : field_name,
                        field_size : field_size,
                        scrollbars : "yes",
                        resizable : "yes",
                        field_optarr : field_optarr,
                        field_multiple : field_multiple,
                        field_disa : field_disa,
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_name = value['field_name'];
     field_size = value['field_size'];
     field_multiple = value['field_multiple'];
     field_disa = value['field_disa'];
     action = value['action'];
     field_optarr = value['field_optarr'];
    }
    
    // Update form
    if (tinyMCE.fieldElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'size', field_size);
     if (field_multiple == "true") {
      tinyMCE.fieldElm.multiple = true;
     } else {
      tinyMCE.fieldElm.multiple = false;
     };
     if (field_disa == "true") {
      tinyMCE.fieldElm.disabled = true;
     } else {
      tinyMCE.fieldElm.disabled = false;
     };
     
     // remove all the previous options
     if (tinyMCE.fieldElm.hasChildNodes()) {
      var cn = tinyMCE.fieldElm;
      for (var i=0; i<cn.childNodes.length; i++) {
       if (cn.childNodes[i].nodeName.toLowerCase() == "option") {
        cn.removeChild(cn.childNodes[i]);
       };
      };
     };
     
     // add the new ones
     for (var i=0; i < field_optarr.length; i++) {
      if (field_optarr[i]['optname']) {
       var newOpt = doc.createElement("option");
       if (field_optarr[i]['optval'])
        newOpt.value=field_optarr[i]['optval'];
       if (field_optarr[i]['optname'])
        newOpt.innerHTML = field_optarr[i]['optname'];
       if (field_optarr[i]['selected'] == "true")
        newOpt.selected = true;
       tinyMCE.fieldElm.appendChild(newOpt);
      };
     };

     tinyMCE.triggerNodeChange();
     return true;
    }

    html += '<select name="' + field_name + '" ';
    if (field_multiple == "true") html += 'multiple="' + field_multiple + '" ';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    if (field_size != "0") html += 'size="' + field_size + '" ';
    html += '>';
    
    if (!field_optarr.length) {
     html += '<option>&nbsp;</option>';
    } else {
     var j = 0;
     for (var i=0; i < field_optarr.length; i++) {
      if (field_optarr[i]['optname']) {
       html += '<option';
       if (field_optarr[i]['optval']) {
        j++;
        html += ' value="' + field_optarr[i]['optval'] + '"';
       };
       if (field_optarr[i]['selected'] == "true") html += ' selected="true"';
       html += '>';
       if (field_optarr[i]['optname']) {
        j++;
        html += field_optarr[i]['optname'];
       };
       html += '</option>';
      };
     };
     if (j == 0) {
      html += '<option>&nbsp;</option>';
     };
    };
    
    html += '</Select>';
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  case "mceFormCheckBox":
   if (!formElm) { return true; };
    var field_type = "checkbox",
        field_name = "mycheckbox",
        field_value = "Yes",
        field_checked = "false",
        field_disa = "false",
        action = "insert";

    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");

    if (tinyMCE.fieldElm && value != "insert") {
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'name', field_name);
     field_value = tinyMCE.getAttrib(tinyMCE.fieldElm, 'value', field_value);
     field_checked = BoolToText(tinyMCE.getAttrib(tinyMCE.fieldElm, 'checked', field_checked));
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     className = tinyMCE.getVisualAidClass(tinyMCE.getAttrib(tinyMCE.fieldElm, 'class'),
                 false);
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/checkbox.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_value : field_value,
                        field_checked : field_checked,
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_value = value['field_value'];
     field_checked = value['field_checked'];
     field_disa = value['field_disa'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'value', field_value);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'checked', field_checked);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" id="' + field_name + '"';
    if (field_value) html += 'value="' + field_value + '" ';
    if (field_checked == "true") html += 'checked=" ' + field_checked + '"';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;

  case "mceFormRadio":
   if (!formElm) { return true; };
    var field_type = "radio",
        field_name = "myradio",
        field_value = "Yes",
        field_checked = "false",
        field_disa = "false",
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");
    
    if (tinyMCE.fieldElm && value != "insert") {
     if ( tinyMCE.getAttrib(tinyMCE.fieldElm, 'type') != field_type ) {
      CallCorrectUpdate(tinyMCE.getAttrib(tinyMCE.fieldElm, 'type'));
      return true;
     };
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'name', field_name);
     field_value = tinyMCE.getAttrib(tinyMCE.fieldElm, 'value', field_value);
     field_checked = BoolToText(tinyMCE.getAttrib(tinyMCE.fieldElm, 'checked', field_checked));
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     className = tinyMCE.getVisualAidClass(tinyMCE.getAttrib(tinyMCE.fieldElm, 'class'),
                 false);
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/radio.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_value : field_value,
                        field_checked : field_checked,
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_value = value['field_value'];
     field_checked = value['field_checked'];
     field_disa = value['field_disa'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'value', field_value);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'checked', field_checked);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" ';
    if (field_value) html += 'value="' + field_value + '" ';
    if (field_checked) html += 'checked="' + field_checked + '"';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  /* opting out
  case "mceFormTextArea":
   return true;
  */
  
  case "mceFormTextBox":
   if (!formElm) { return true; };
    var field_type = "text",
        field_name = "mytext",
        field_value = "",
        field_size = 20,
        field_maxlen = 0,
        field_auto = "false",
        field_disa = "false",
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");

    if (tinyMCE.fieldElm && value != "insert") {
     if ( tinyMCE.getAttrib(tinyMCE.fieldElm, 'type') != field_type ) {
      CallCorrectUpdate(tinyMCE.getAttrib(tinyMCE.fieldElm, 'type'));
      return true;
     };
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'name', field_name);
     field_value = tinyMCE.getAttrib(tinyMCE.fieldElm, 'value', field_value);
     field_size = tinyMCE.getAttrib(tinyMCE.fieldElm, 'size', field_size);
     field_maxlen = tinyMCE.getAttrib(tinyMCE.fieldElm, 'maxlength', field_maxlen);
     field_auto = tinyMCE.fieldElm.autocomplete ? "true" : "false";
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/textbox.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_value : field_value,
                        field_size : field_size,
                        field_maxlen : field_maxlen,
                        field_auto : field_auto,
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_value = value['field_value'];
     field_size = value['field_size'];
     field_maxlen = value['field_maxlen'];
     field_auto = value['field_auto'];
     field_disa = value['field_disa'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'value', field_value);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'size', field_size, true);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'maxlength', field_maxlen, true);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'autocomplete', field_auto);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" ';
    if (field_value) html += 'value="' + field_value + '" ';
    if (field_size) html += 'size="' + field_size + '" ';
    if (field_maxlen>0) html += 'maxlength="' + field_maxlen + '" ';
    if (field_auto == "true") html += 'autocomplete="' + field_auto + '" ';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  case "mceFormPassword":
   if (!formElm) { return true; };
    var field_type = "password",
        field_name = "mypassword",
        field_size = 20,
        field_maxlen = "",
        field_auto = "false",
        field_disa = "false",
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");
    
    if (tinyMCE.fieldElm && value != "insert") {
     if ( tinyMCE.getAttrib(tinyMCE.fieldElm, 'type') != field_type ) {
      CallCorrectUpdate(tinyMCE.getAttrib(tinyMCE.fieldElm, 'type'));
      return true;
     };
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'name', field_name);
     field_size = tinyMCE.getAttrib(tinyMCE.fieldElm, 'size', field_size);
     field_maxlen = tinyMCE.getAttrib(tinyMCE.fieldElm, 'maxlength', field_maxlen);
     field_auto = tinyMCE.fieldElm.autocomplete ? "true" : "false";
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/password.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_size : field_size,
                        field_maxlen : field_maxlen,
                        field_auto : field_auto,
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_size = value['field_size'];
     field_maxlen = value['field_maxlen'];
     field_auto = value['field_auto'];
     field_disa = value['field_disa'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'size', field_size, true);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'maxlength', field_maxlen, true);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'autocomplete', field_auto);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" ';
    if (field_size) html += 'size="' + field_size + '" ';
    if (field_maxlen) html += 'maxlength="' + field_maxlen + '" ';
    if (field_auto == "true") html += 'autocomplete="' + field_auto + '" ';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  case "mceFormHidden":
   if (!formElm) { return true; };
    var field_type = "hidden",
        field_name = "myhidden",
        field_value = "",
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");
    
    if (tinyMCE.fieldElm && value != "insert") {
     if ( tinyMCE.getAttrib(tinyMCE.fieldElm, 'type') != field_type ) {
      CallCorrectUpdate(tinyMCE.getAttrib(tinyMCE.fieldElm, 'type'));
      return true;
     };
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'field_type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'field_name', field_name);
     field_value = tinyMCE.getAttrib(tinyMCE.fieldElm, 'field_value', field_value);
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/hidden.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_value : field_value,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_value = value['field_value'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'value', field_value);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" ';
    if (field_value) html += 'value="' + field_value + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  case "mceFormSubmit":
   if (!formElm) { return true; };
    var field_type = "submit",
        field_name = "mysubmit",
        field_value = "Submit Query",
        field_disa = "false",
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");
    
    if (tinyMCE.fieldElm && value != "insert") {
     if ( tinyMCE.getAttrib(tinyMCE.fieldElm, 'type') != field_type ) {
      CallCorrectUpdate(tinyMCE.getAttrib(tinyMCE.fieldElm, 'type'));
      return true;
     };
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'name', field_name);
     field_value = tinyMCE.getAttrib(tinyMCE.fieldElm, 'value', field_value);
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/submit.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_value : field_value,
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_value = value['field_value'];
     field_disa = value['field_disa'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'value', field_value);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" ';
    if (field_value) html += 'value="' + field_value + '" ';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  case "mceFormReset":
   if (!formElm) { return true; };
    var field_type = "reset",
        field_name = "myreset",
        field_value = "Reset",
        field_disa = "false",
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");
    
    if (tinyMCE.fieldElm && value != "insert") {
     if ( tinyMCE.getAttrib(tinyMCE.fieldElm, 'type') != field_type ) {
      CallCorrectUpdate(tinyMCE.getAttrib(tinyMCE.fieldElm, 'type'));
      return true;
     };
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'field_type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'field_name', field_name);
     field_value = tinyMCE.getAttrib(tinyMCE.fieldElm, 'field_value', field_value);
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/reset.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_value : field_value,
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_value = value['field_value'];
     field_disa = value['field_disa'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'value', field_value);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" ';
    if (field_value) html += 'value="' + field_value + '" ';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  /* opting out
  case "mceFormImage":
   return true;
  */
  
  case "mceFormButton":
   if (!formElm) { return true; };
    var field_type = "button",
        field_name = "mybutton",
        field_value = "Push It",
        field_disa = "false",
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");
    
    if (tinyMCE.fieldElm && value != "insert") {
     if ( tinyMCE.getAttrib(tinyMCE.fieldElm, 'type') != field_type ) {
      CallCorrectUpdate(tinyMCE.getAttrib(tinyMCE.fieldElm, 'type'));
      return true;
     };
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'name', field_name);
     field_value = tinyMCE.getAttrib(tinyMCE.fieldElm, 'value', field_value);
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/button.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_value : field_value,
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_value = value['field_value'];
     field_disa = value['field_disa'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'value', field_value);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" ';
    if (field_value) html += 'value="' + field_value + '" ';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  case "mceFormFile":
   if (!formElm) { return true; };
    var field_type = "file",
        field_name = "myfile",
        field_disa = "false",
        action = "insert";
    
    tinyMCE.fieldElm = tinyMCE.getParentElement(inst.getFocusElement(), "input");
    
    if (tinyMCE.fieldElm && value != "insert") {
     if ( tinyMCE.getAttrib(tinyMCE.fieldElm, 'type') != field_type ) {
      CallCorrectUpdate(tinyMCE.getAttrib(tinyMCE.fieldElm, 'type'));
      return true;
     };
     field_type = tinyMCE.getAttrib(tinyMCE.fieldElm, 'type', field_type);
     field_name = tinyMCE.getAttrib(tinyMCE.fieldElm, 'name', field_name);
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
     action = "update";
    }

   if (user_interface) {
    // Setup template
    var template = new Array();
    template['file'] = '../../plugins/form/file.htm';
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;

    // Open window
    tinyMCE.openWindow(template,
                       {editor_id : inst.editorId,
                        field_type : field_type,
                        field_name : field_name,
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
                        action : action
                       }
                      );
   } else {
    var html = '';
    
    if (typeof(value) == 'object') {
     field_type = value['field_type'];
     field_name = value['field_name'];
     field_disa = value['field_disa'];
     action = value['action'];
    }
    
    // Update form
    if (tinyMCE.formElm && action == "update") {
     inst.execCommand("mceAddUndoLevel");
     
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'type', field_type);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'name', field_name);
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
     
     tinyMCE.triggerNodeChange();
     return true;
    }
    
    // Create new field
    html += '<input type="' + field_type + '" ';
    if (field_name) html += 'name="' + field_name + '" ';
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
    html += '/>';
    
    inst.execCommand('mceInsertContent', false, html);
   }
   return true;
  break;
  
  /* paste for disabled
        field_disa = "false",
     field_disa = tinyMCE.fieldElm.disabled ? "true" : "false";
    // add these incase the bug 1256783 gets fixed
     template['scrollbars'] = "yes";
     template['resizable'] = "yes";
     template['width'] = 800;
     template['height'] = 240;
                        field_disa : field_disa,
                        scrollbars : "yes",
                        resizable : "yes",
     field_disa = value['field_disa'];
     tinyMCE.setAttrib(tinyMCE.fieldElm, 'disabled', field_disa);
    if (field_disa == "true") html += 'disabled="' + field_disa + '" ';
   */
  
  /* opting out
  case "mceFormLegend":
   return true;
  */
  
 }
 // Pass to next handler in chain
 return false;
}

function TinyMCE_form_handleNodeChange(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {
 
 var inst = tinyMCE.getInstanceById(editor_id);

 // Reset form controls
 tinyMCE.switchClassSticky(editor_id + '_form', 'mceButtonNormal', true);
 tinyMCE.switchClassSticky(editor_id + '_property', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_select', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_checkbox', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_radio', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_textbox', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_password', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_hidden', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_submit', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_reset', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_button', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_file', 'mceButtonDisabled', true);
  /* opting out
 tinyMCE.switchClassSticky(editor_id + '_textarea', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_image', 'mceButtonDisabled', true);
 tinyMCE.switchClassSticky(editor_id + '_legend', 'mceButtonDisabled', true);
  */

 // Within a form element
 if (node.nodeName.toLowerCase() == "select") {
  tinyMCE.switchClassSticky(editor_id + '_select', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_form', 'mceButtonDisabled',true);
  tinyMCE.switchClassSticky(editor_id + '_property', 'mceButtonNormal', false);
  return;
 };
  
 if (node.nodeName.toLowerCase() == "input") {
  switch (node.type) {
   case "text":
    tinyMCE.switchClassSticky(editor_id + '_form', 'mceButtonDisabled',true);
    tinyMCE.switchClassSticky(editor_id + '_property', 'mceButtonNormal', false);
    tinyMCE.switchClassSticky(editor_id + '_textbox', 'mceButtonNormal', false);
    return;
    break;
   case "checkbox":
   case "radio":
   case "password":
   case "hidden":
   case "submit":
   case "reset":
   case "file":
   case "select":
   case "button":
    tinyMCE.switchClassSticky(editor_id + '_form', 'mceButtonDisabled',true);
    tinyMCE.switchClassSticky(editor_id + '_property', 'mceButtonNormal', false);
    tinyMCE.switchClassSticky(editor_id + '_' + node.type, 'mceButtonNormal', false);
    return;
    break;
  };
 };
 if (tinyMCE.getParentElement(node, "form")) {
 //alert (node.nodeName);
  tinyMCE.switchClassSticky(editor_id + '_form', 'mceButtonDisabled',true);
  tinyMCE.switchClassSticky(editor_id + '_property', 'mceButtonDisabled', false);
  tinyMCE.switchClassSticky(editor_id + '_select', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_checkbox', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_radio', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_textbox', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_password', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_hidden', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_submit', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_reset', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_button', 'mceButtonNormal', false);
  tinyMCE.switchClassSticky(editor_id + '_file', 'mceButtonNormal', false);
  /* opting out
  tinyMCE.switchClassSticky(editor_id + '_textarea', 'mceButtonDisabled', false);
  tinyMCE.switchClassSticky(editor_id + '_image', 'mceButtonDisabled', false);
  tinyMCE.switchClassSticky(editor_id + '_legend', 'mceButtonDisabled', false);
  */
 };

}

