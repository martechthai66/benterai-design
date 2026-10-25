/* REFERENCE ONLY — design prototype, not production code. Asset paths are relative to preview/index.html.
   @ds-bundle: {"format": 4, "namespace": "BenterAI", "components": [{"name": "Icon"}, {"name": "Logo"}, {"name": "Button"}, {"name": "IconButton"}, {"name": "StatusBadge"}, {"name": "ProgressBar"}, {"name": "Skeleton"}, {"name": "Field"}, {"name": "TextInput"}, {"name": "Select"}, {"name": "Checkbox"}, {"name": "Switch"}, {"name": "Segmented"}, {"name": "Tabs"}, {"name": "Menu"}, {"name": "Avatar"}, {"name": "Alert"}, {"name": "EmptyState"}, {"name": "Dialog"}, {"name": "Toast"}, {"name": "FileType"}, {"name": "Attachment"}, {"name": "DataTable"}, {"name": "StatTile"}, {"name": "UsageMeter"}, {"name": "Sidebar"}, {"name": "ChatListItem"}, {"name": "AppShell"}, {"name": "PlusMenu"}, {"name": "LibraryPicker"}, {"name": "ModelPicker"}, {"name": "Composer"}, {"name": "Message"}, {"name": "SourceList"}, {"name": "DocumentRow"}]} */
(function () {
  var React = window.React;
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useContext = React.useContext, Fragment = React.Fragment;
  function cx() { var a = []; for (var i = 0; i < arguments.length; i++) if (arguments[i]) a.push(arguments[i]); return a.join(' '); }

  var ASSETS = {
    logo: '../assets/logos/benterai-logo.png',
    logoReversed: '../assets/logos/benterai-logo-reversed.png',
    wordmark: '../assets/logos/benterai-wordmark.png',
    wordmarkReversed: '../assets/logos/benterai-wordmark-reversed.png',
    spark: '../assets/logos/benterai-spark.png'
  };

  /* ---------------- context: language, theme, device ---------------- */
  var UICtx = React.createContext({ lang: 'th', navLang: 'en', theme: null, mobile: false });
  function useUI() { return useContext(UICtx); }
  function useL() { var c = useUI(); return function (th, en) { return c.lang === 'en' ? (en == null ? th : en) : th; }; }
  function useNavL() { var c = useUI(); return function (th, en) { return c.navLang === 'th' ? th : en; }; }
  function currentTheme(ctx) {
    if (ctx && ctx.theme) return ctx.theme;
    var t = document.documentElement.getAttribute('data-theme');
    return t === 'dark' ? 'dark' : 'light';
  }

  /* ---------------- icons (24px grid, 1.75 stroke, round caps — Lucide-compatible names) ---------------- */
  var P = {
    plus: 'M12 5v14M5 12h14',
    search: ['c11 11 7', 'M20 20l-3.6-3.6'],
    chat: 'M5 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1z',
    book: 'M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z',
    'file-plus': 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M12 11v6M9 14h6',
    building: 'M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3',
    settings: ['M4 7h9M17 7h3M4 17h3M11 17h9', 'c15 7 2', 'c9 17 2'],
    'arrow-up': 'M12 19V5M6 11l6-6 6 6',
    stop: 'F M8 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z',
    paperclip: 'M20 11.5l-7.8 7.8a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8',
    globe: ['c12 12 9', 'M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18'],
    image: ['M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'c9 10 2', 'M21 16l-5-5-9 9'],
    library: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5',
    pin: 'M9 4h6M10 4v6l-3 4h10l-3-4V4M12 14v6',
    more: ['f5 12 1.4', 'f12 12 1.4', 'f19 12 1.4'],
    trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6',
    download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
    upload: 'M12 16V5M7 10l5-5 5 5M5 20h14',
    users: ['c9.5 8 3.5', 'M3 20v-1a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v1M16.5 4.3a3.5 3.5 0 0 1 0 7.4M21 20v-1a4 4 0 0 0-3-3.9'],
    'user-plus': ['c9.5 8 3.5', 'M3 20v-1a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v1M19 8v6M16 11h6'],
    share: ['c18 5 2.5', 'c6 12 2.5', 'c18 19 2.5', 'M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6'],
    check: 'M5 12.5l4.5 4.5L19 7.5',
    x: 'M6 6l12 12M18 6L6 18',
    alert: 'M10.3 4.2L2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0zM12 9.5v4M12 17h.01',
    info: ['c12 12 9', 'M12 11v5M12 8h.01'],
    'check-circle': ['c12 12 9', 'M8 12.5l2.7 2.7L16 9.8'],
    'x-circle': ['c12 12 9', 'M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6'],
    clock: ['c12 12 9', 'M12 7v5l3 2'],
    'chevron-down': 'M6 9l6 6 6-6',
    'chevron-right': 'M9 6l6 6-6 6',
    'chevron-left': 'M15 6l-6 6 6 6',
    user: ['c12 8 4', 'M4 21a8 8 0 0 1 16 0'],
    logout: 'M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 8l-4 4 4 4M6 12h10',
    menu: 'M4 7h16M4 12h16M4 17h16',
    sun: ['c12 12 4', 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'],
    moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
    lock: ['M7 11h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z', 'M8 11V8a4 4 0 0 1 8 0v3'],
    copy: ['M11 9h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z', 'M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3'],
    refresh: 'M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4',
    edit: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
    file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5',
    'file-text': 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6',
    history: 'M3 12a9 9 0 1 0 3-6.7M3 4v4h4M12 8v4l3 2',
    eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z', 'c12 12 3'],
    key: ['c8 15 4', 'M11 12l9-9M17 6l3 3M14.5 8.5l2 2'],
    shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
    chart: 'M5 20V11M12 20V5M19 20v-6M3 20h18',
    filter: 'M4 5h16l-6 7v6l-4 2v-8z',
    external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
    spark: 'F M12 2.5c.8 5.3 4.2 8.7 9.5 9.5-5.3.8-8.7 4.2-9.5 9.5-.8-5.3-4.2-8.7-9.5-9.5 5.3-.8 8.7-4.2 9.5-9.5z',
    mail: ['M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z', 'M3 7l9 6 9-6'],
    type: 'M5 7V5h14v2M12 5v14M9 19h6',
    palette: ['M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.6 0-1-.8-1.4-.8-2.4 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5z', 'f7.5 11 1.2', 'f10 7 1.2', 'f15 7.5 1.2'],
    sliders: 'M4 6h16M4 12h16M4 18h16',
    archive: 'M3 4h18v4H3zM5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4',
    gauge: ['M4 18a9 9 0 1 1 16 0', 'M12 13l4-4', 'f12 13 1.5'],
    grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',
    star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
    sparkles: 'F M10 3c.6 3.9 3.1 6.4 7 7-3.9.6-6.4 3.1-7 7-.6-3.9-3.1-6.4-7-7 3.9-.6 6.4-3.1 7-7zM18.5 14c.3 2 1.5 3.2 3.5 3.5-2 .3-3.2 1.5-3.5 3.5-.3-2-1.5-3.2-3.5-3.5 2-.3 3.2-1.5 3.5-3.5z'
  };
  function Icon(props) {
    var name = props.name, size = props.size || 18, d = P[name] || P.info;
    var parts = Array.isArray(d) ? d : [d];
    var kids = parts.map(function (p, i) {
      if (p.charAt(0) === 'c') { var a = p.slice(1).trim().split(/\s+/); return h('circle', { key: i, cx: a[0], cy: a[1], r: a[2] }); }
      if (p.charAt(0) === 'f') { var b = p.slice(1).trim().split(/\s+/); return h('circle', { key: i, cx: b[0], cy: b[1], r: b[2], fill: 'currentColor', stroke: 'none' }); }
      if (p.indexOf('F ') === 0) return h('path', { key: i, d: p.slice(2), fill: 'currentColor', stroke: 'none' });
      return h('path', { key: i, d: p });
    });
    return h('svg', { className: cx('ba-icon', props.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: props.strokeWidth || 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': props.title ? undefined : true, role: props.title ? 'img' : undefined, style: props.style }, props.title ? h('title', null, props.title) : null, kids);
  }
  Icon.names = Object.keys(P);

  /* ---------------- primitives ---------------- */
  function Logo(props) {
    var ui = useUI(); var dark = (props.theme || currentTheme(ui)) === 'dark';
    var v = props.variant || 'wordmark';
    var src = v === 'spark' ? ASSETS.spark : v === 'full' ? (dark ? ASSETS.logoReversed : ASSETS.logo) : (dark ? ASSETS.wordmarkReversed : ASSETS.wordmark);
    return h('img', { className: cx('ba-logo', props.className), src: src, alt: v === 'spark' ? '' : 'BenterAI', style: { height: props.height || (v === 'full' ? 48 : 24) } });
  }

  function Spinner(props) { var s = props.size || 16; return h('span', { className: 'ba-spinner', role: 'status', 'aria-label': props.label || 'Loading', style: { width: s, height: s } }); }

  function Button(props) {
    var variant = props.variant || 'secondary', size = props.size || 'md';
    var rest = Object.assign({}, props);
    ['variant', 'size', 'icon', 'iconRight', 'loading', 'block', 'children', 'className'].forEach(function (k) { delete rest[k]; });
    var isz = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('ba-btn', 'ba-btn-' + variant, size !== 'md' && 'ba-btn-' + size, props.block && 'ba-btn-block', props.className),
      disabled: props.disabled || props.loading, 'aria-busy': props.loading ? 'true' : undefined
    }), props.loading ? h(Spinner, { size: isz - 2 }) : props.icon ? h(Icon, { name: props.icon, size: isz }) : null, props.children, props.iconRight ? h(Icon, { name: props.iconRight, size: isz }) : null);
  }

  function IconButton(props) {
    var rest = Object.assign({}, props);
    ['icon', 'label', 'variant', 'size', 'active', 'className', 'iconSize'].forEach(function (k) { delete rest[k]; });
    var size = props.size || 'md';
    return h('button', Object.assign({ type: 'button', 'aria-label': props.label, title: props.label }, rest, {
      className: cx('ba-iconbtn', size !== 'md' && 'ba-iconbtn-' + size, props.variant && 'ba-iconbtn-' + props.variant, props.active && 'is-active', props.className)
    }), h(Icon, { name: props.icon, size: props.iconSize || (size === 'sm' ? 16 : 18) }));
  }

  var STATUS = {
    pending: { tone: 'neutral', icon: 'clock', th: 'รอคิว', en: 'Queued' },
    processing: { tone: 'info', icon: null, th: 'กำลังประมวลผล', en: 'Processing' },
    ready: { tone: 'success', icon: 'check', th: 'พร้อมใช้', en: 'Ready' },
    failed: { tone: 'danger', icon: 'x-circle', th: 'ล้มเหลว', en: 'Failed' },
    active: { tone: 'success', icon: 'check', th: 'ใช้งานอยู่', en: 'Active' },
    'pending-account': { tone: 'warning', icon: 'clock', th: 'รออนุมัติ', en: 'Pending' },
    suspended: { tone: 'danger', icon: 'lock', th: 'ระงับ', en: 'Suspended' },
    uploading: { tone: 'info', icon: null, th: 'กำลังอัปโหลด', en: 'Uploading' },
    reading: { tone: 'info', icon: null, th: 'กำลังอ่านไฟล์', en: 'Reading' }
  };
  function StatusBadge(props) {
    var L = useL(); var s = STATUS[props.status] || STATUS.pending;
    var label = props.children || L(s.th, s.en);
    return h('span', { className: cx('ba-badge', 'ba-badge-' + (props.tone || s.tone)) },
      s.icon ? h(Icon, { name: s.icon, size: 13, strokeWidth: 2.25 }) : h(Spinner, { size: 11 }),
      label, props.progress != null ? h('span', { style: { opacity: .8, fontVariantNumeric: 'tabular-nums' } }, ' ' + props.progress + '%') : null);
  }

  function ProgressBar(props) {
    var v = Math.max(0, Math.min(100, props.value || 0));
    return h('div', { className: cx('ba-progress', props.tone && 'ba-progress-' + props.tone, props.indeterminate && 'ba-progress-indeterminate'), role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': props.indeterminate ? undefined : v, 'aria-label': props.label, style: props.style },
      h('i', { style: { width: v + '%' } }));
  }

  function Skeleton(props) {
    if (props.lines) {
      var arr = []; for (var i = 0; i < props.lines; i++) arr.push(h('span', { key: i, className: 'ba-skel', style: { height: props.h || 12, width: i === props.lines - 1 ? '60%' : '100%' } }));
      return h('div', { className: 'ba-stack', style: { gap: 10 } }, arr);
    }
    return h('span', { className: 'ba-skel', style: { width: props.w || '100%', height: props.h || 14, borderRadius: props.r } });
  }

  function Field(props) {
    return h('label', { className: 'ba-field', style: props.style },
      props.label ? h('span', { className: 'ba-field-label' }, props.label, props.required ? h('span', { className: 'req', 'aria-hidden': true }, '*') : null) : null,
      props.children,
      props.error ? h('span', { className: 'ba-field-error', role: 'alert' }, h(Icon, { name: 'alert', size: 15, style: { marginTop: 3 } }), props.error)
        : props.hint ? h('span', { className: 'ba-field-hint' }, props.hint) : null);
  }
  function TextInput(props) {
    var rest = Object.assign({}, props); ['icon', 'invalid', 'size', 'className'].forEach(function (k) { delete rest[k]; });
    var input = h('input', Object.assign({ type: 'text' }, rest, { className: cx('ba-input', props.size === 'sm' && 'ba-input-sm', props.className), 'aria-invalid': props.invalid ? 'true' : undefined }));
    return props.icon ? h('span', { className: 'ba-input-wrap' }, h(Icon, { name: props.icon, size: 17 }), input) : input;
  }
  function Textarea(props) {
    var rest = Object.assign({}, props); delete rest.invalid;
    return h('textarea', Object.assign({}, rest, { className: cx('ba-textarea', props.className), 'aria-invalid': props.invalid ? 'true' : undefined }));
  }
  function Select(props) {
    var rest = Object.assign({}, props); ['options', 'className', 'size', 'wrapStyle'].forEach(function (k) { delete rest[k]; });
    return h('span', { className: 'ba-select-wrap', style: props.wrapStyle },
      h('select', Object.assign({}, rest, { className: cx('ba-select', props.size === 'sm' && 'ba-input-sm', props.className) }),
        (props.options || []).map(function (o) { var v = typeof o === 'string' ? o : o.value; return h('option', { key: v, value: v, disabled: o.disabled }, typeof o === 'string' ? o : o.label); })),
      h(Icon, { name: 'chevron-down', size: 16 }));
  }
  function Checkbox(props) {
    return h('label', { className: 'ba-check', style: props.style },
      h('input', { type: 'checkbox', checked: !!props.checked, disabled: props.disabled, onChange: function (e) { props.onChange && props.onChange(e.target.checked); } }),
      h('span', { className: 'ba-check-box' }, props.checked ? h(Icon, { name: 'check', size: 13, strokeWidth: 3 }) : null),
      props.label != null ? h('span', null, props.label, props.description ? h('span', { className: 'ba-field-hint', style: { display: 'block' } }, props.description) : null) : null);
  }
  function Switch(props) {
    var btn = h('button', { type: 'button', role: 'switch', className: 'ba-switch-track', 'aria-checked': props.checked ? 'true' : 'false', 'aria-label': typeof props.label === 'string' ? props.label : undefined, disabled: props.disabled, onClick: function () { props.onChange && props.onChange(!props.checked); } });
    if (!props.label) return btn;
    return h('span', { className: 'ba-switch' }, btn, h('span', { className: 'ba-stack' }, h('span', { style: { fontWeight: 500 } }, props.label), props.description ? h('span', { className: 'ba-field-hint' }, props.description) : null));
  }
  function Segmented(props) {
    return h('div', { className: cx('ba-seg', props.size === 'sm' && 'ba-seg-sm', props.block && 'ba-seg-block'), role: 'group', 'aria-label': props.label },
      props.options.map(function (o) {
        return h('button', { key: o.value, type: 'button', 'aria-pressed': props.value === o.value ? 'true' : 'false', onClick: function () { props.onChange && props.onChange(o.value); }, disabled: o.disabled },
          o.icon ? h(Icon, { name: o.icon, size: 15 }) : null, o.label);
      }));
  }
  function Tabs(props) {
    return h('div', { className: 'ba-tabs', role: 'tablist', style: props.style },
      props.items.map(function (it) {
        return h('button', { key: it.value, type: 'button', role: 'tab', className: 'ba-tab', 'aria-selected': props.value === it.value ? 'true' : 'false', 'aria-disabled': it.disabled ? 'true' : undefined, title: it.title, onClick: function () { if (!it.disabled && props.onChange) props.onChange(it.value); } },
          it.icon ? h(Icon, { name: it.icon, size: 17 }) : null, it.label, it.count != null ? h('span', { className: 'ba-count' }, it.count) : null);
      }));
  }
  function Menu(props) {
    return h('div', { className: 'ba-menu', role: 'menu', style: props.style },
      props.label ? h('div', { className: 'ba-menu-label' }, props.label) : null,
      props.items.map(function (it, i) {
        if (it === '-' || it.sep) return h('div', { key: i, className: 'ba-menu-sep', role: 'separator' });
        return h('button', { key: i, type: 'button', role: 'menuitem', className: cx('ba-menu-item', it.danger && 'ba-menu-item-danger', it.focus && 'is-focus'), disabled: it.disabled, onClick: it.onClick },
          it.icon ? h(Icon, { name: it.icon, size: 18 }) : null,
          h('span', { className: 'ba-menu-item-text' }, h('span', null, it.label), it.hint ? h('span', { className: 'ba-menu-item-hint' }, it.hint) : null),
          it.end || null);
      }), props.children);
  }
  function Avatar(props) {
    var s = props.size || 32;
    if (props.spark) return h('span', { className: 'ba-avatar ba-avatar-spark', style: { width: s, height: s } }, h('img', { src: ASSETS.spark, alt: '' }));
    var init = (props.name || '?').trim().split(/\s+/).map(function (w) { return w.charAt(0); }).slice(0, 2).join('');
    return h('span', { className: 'ba-avatar', style: { width: s, height: s, fontSize: Math.round(s * 0.4) } }, init);
  }
  function Alert(props) {
    var icons = { info: 'info', success: 'check-circle', warning: 'alert', danger: 'x-circle' };
    var tone = props.tone || 'info';
    return h('div', { className: cx('ba-alert', 'ba-alert-' + tone), role: tone === 'danger' ? 'alert' : 'status', style: props.style },
      h(Icon, { name: props.icon || icons[tone], size: 18 }),
      h('div', { className: 'ba-alert-body' }, props.title ? h('div', { className: 'ba-alert-title' }, props.title) : null, props.children),
      props.action ? h('div', { className: 'ba-alert-actions' }, props.action) : null);
  }
  function EmptyState(props) {
    return h('div', { className: 'ba-empty', style: props.style },
      h('span', { className: cx('ba-empty-art', props.tone && 'ba-empty-art-' + props.tone) }, h(Icon, { name: props.icon || 'file', size: 26 })),
      h('div', { className: 'ba-t-h3' }, props.title),
      props.children ? h('div', { className: 'ba-empty-body' }, props.children) : null,
      props.actions ? h('div', { className: 'ba-empty-actions' }, props.actions) : null);
  }
  function Dialog(props) {
    if (props.open === false) return null;
    return h('div', { className: 'ba-dialog-scrim', onClick: function (e) { if (e.target === e.currentTarget && props.onClose) props.onClose(); } },
      h('div', { className: cx('ba-dialog', props.size === 'sm' && 'ba-dialog-sm'), role: props.tone === 'danger' ? 'alertdialog' : 'dialog', 'aria-modal': 'true', 'aria-label': props.title },
        h('div', { className: 'ba-dialog-head' },
          props.icon ? h('span', { className: cx('ba-dialog-icon', 'ba-dialog-icon-' + (props.tone || 'info')) }, h(Icon, { name: props.icon, size: 20 })) : null,
          h('div', { className: 'ba-dialog-head-text' }, h('div', { className: 'ba-t-h3' }, props.title), props.description ? h('div', { className: 'ba-muted' }, props.description) : null),
          props.onClose ? h(IconButton, { icon: 'x', label: 'Close', size: 'sm', onClick: props.onClose }) : null),
        props.children ? h('div', { className: 'ba-dialog-body' }, props.children) : h('div', { style: { height: 20 } }),
        props.footer ? h('div', { className: 'ba-dialog-foot' }, props.footer) : null));
  }
  function Toast(props) {
    var icons = { success: 'check-circle', danger: 'x-circle', info: 'info', warning: 'alert' };
    var tone = props.tone || 'success';
    return h('div', { className: cx('ba-toast', 'ba-toast-' + tone), role: 'status' },
      h('span', { className: 'ba-toast-icon' }, h(Icon, { name: icons[tone], size: 17 })),
      h('div', { className: 'ba-toast-text' }, h('div', { className: 'ba-toast-title' }, props.title), props.children ? h('div', { className: 'ba-toast-msg' }, props.children) : null),
      props.action || null,
      props.onClose ? h(IconButton, { icon: 'x', label: 'Dismiss', size: 'sm', onClick: props.onClose }) : null);
  }
  function FileType(props) {
    var ext = (props.ext || 'file').toLowerCase();
    return h('span', { className: cx('ba-filetype', 'ba-filetype-' + ext), 'aria-hidden': true, style: props.size ? { width: props.size, height: props.size } : null }, ext.toUpperCase().slice(0, 4));
  }
  function Attachment(props) {
    var L = useL(); var st = props.status || 'ready';
    var meta = st === 'failed' ? (props.error || L('อ่านไฟล์ไม่สำเร็จ', 'Could not read file'))
      : st === 'uploading' ? L('กำลังอัปโหลด ' + (props.progress || 0) + '%', 'Uploading ' + (props.progress || 0) + '%')
        : st === 'reading' ? L('กำลังอ่านเนื้อหา…', 'Reading content…')
          : props.kind === 'knowledge' ? L('จาก Knowledge · ', 'From Knowledge · ') + (props.meta || '') : (props.meta || L('พร้อมใช้', 'Ready'));
    return h('div', { className: cx('ba-attach', props.kind === 'knowledge' && 'ba-attach-kb', st === 'failed' && 'ba-attach-failed') },
      h('span', { className: 'ba-attach-icon' }, (st === 'uploading' || st === 'reading') ? h(Spinner, { size: 15 }) : h(Icon, { name: st === 'failed' ? 'alert' : props.kind === 'knowledge' ? 'book' : props.image ? 'image' : 'file-text', size: 17 })),
      h('span', { className: 'ba-attach-text' }, h('div', { className: 'ba-attach-name' }, props.name),
        h('div', { className: 'ba-attach-meta' }, st === 'ready' && props.kind !== 'knowledge' ? h(Icon, { name: 'check', size: 12, strokeWidth: 2.5, style: { color: 'var(--success)' } }) : null, meta)),
      props.onRemove ? h(IconButton, { icon: 'x', size: 'sm', label: L('เอาออก', 'Remove'), onClick: props.onRemove }) : null);
  }
  function DataTable(props) {
    return h('div', { className: 'ba-table-wrap', style: props.style },
      h('div', { className: 'ba-table-scroll' },
        h('table', { className: 'ba-table' },
          h('thead', null, h('tr', null, props.columns.map(function (c, i) { return h('th', { key: i, className: c.className, style: c.width ? { width: c.width } : null }, c.label); }))),
          h('tbody', null, props.rows.length ? props.rows.map(function (r, ri) {
            return h('tr', { key: r.key || ri }, props.columns.map(function (c, ci) { return h('td', { key: ci, className: c.className }, c.render ? c.render(r) : r[c.key]); }));
          }) : h('tr', null, h('td', { colSpan: props.columns.length }, props.empty))))));
  }
  function StatTile(props) {
    return h('div', { className: 'ba-stat' }, h('div', { className: 'ba-stat-label' }, props.label), h('div', { className: 'ba-stat-value' }, props.value), props.sub ? h('div', { className: 'ba-stat-sub' }, props.sub) : null, props.children);
  }
  function UsageMeter(props) {
    var pct = props.limit ? Math.round(props.used / props.limit * 100) : 0;
    var tone = pct >= 100 ? 'danger' : pct >= 80 ? 'warning' : null;
    return h('div', { className: 'ba-meter', style: props.style },
      h('div', { className: 'ba-meter-top' }, h('span', null, (props.used || 0).toLocaleString('en-US') + (props.limit ? ' / ' + props.limit.toLocaleString('en-US') : '')), h('span', { style: { color: tone ? 'var(--' + tone + ')' : 'var(--ink-muted)', fontWeight: tone ? 600 : 400 } }, props.limit ? pct + '%' : '∞')),
      h(ProgressBar, { value: pct, tone: tone }));
  }

  /* ---------------- shell pieces ---------------- */
  function NavItem(props) {
    return h('button', { type: 'button', className: 'ba-navitem', 'aria-current': props.active ? 'page' : undefined, 'aria-disabled': props.locked ? 'true' : undefined, title: props.locked ? props.lockedHint : undefined, onClick: props.locked ? undefined : props.onClick },
      h(Icon, { name: props.icon, size: 19 }), h('span', { style: { flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, props.label),
      props.locked ? h('span', { className: 'ba-navitem-end' }, h(Icon, { name: 'lock', size: 15 })) : props.end || null);
  }

  function ChatListItem(props) {
    var L = useL();
    var _r = useState(props.title), name = _r[0], setName = _r[1];
    if (props.renaming) {
      return h('div', { className: 'ba-chatitem', 'aria-current': 'page' },
        h('input', { className: 'ba-chatitem-rename', value: name, autoFocus: true, onChange: function (e) { setName(e.target.value); }, onKeyDown: function (e) { if (e.key === 'Enter' && props.onRenamed) props.onRenamed(name); if (e.key === 'Escape' && props.onRenamed) props.onRenamed(null); }, 'aria-label': L('ชื่อแชต', 'Chat name') }),
        h(IconButton, { icon: 'check', size: 'sm', label: L('บันทึกชื่อ', 'Save name'), onClick: function () { props.onRenamed && props.onRenamed(name); } }));
    }
    return h('div', { className: cx('ba-chatitem', props.menuOpen && 'is-menu'), 'aria-current': props.active ? 'page' : undefined, onClick: props.onOpen, role: 'link', tabIndex: 0 },
      props.pinned ? h('span', { className: 'ba-chatitem-pin', title: L('ปักหมุดแล้ว', 'Pinned') }, h(Icon, { name: 'pin', size: 14 })) : null,
      h('span', { className: 'ba-chatitem-title' }, props.title),
      h(IconButton, { icon: 'more', size: 'sm', label: L('ตัวเลือกแชต', 'Chat options'), onClick: function (e) { e.stopPropagation(); props.onMenu && props.onMenu(); } }),
      props.menuOpen ? h(Menu, {
        style: { width: 210 }, items: [
          { icon: 'edit', label: L('เปลี่ยนชื่อ', 'Rename'), onClick: function (e) { e.stopPropagation(); props.onAction && props.onAction('rename'); } },
          { icon: 'pin', label: props.pinned ? L('เลิกปักหมุด', 'Unpin') : L('ปักหมุด', 'Pin'), onClick: function (e) { e.stopPropagation(); props.onAction && props.onAction('pin'); } },
          { icon: 'download', label: L('ส่งออกข้อความ (.md)', 'Export messages (.md)'), onClick: function (e) { e.stopPropagation(); props.onAction && props.onAction('export'); } },
          '-',
          { icon: 'trash', label: L('ลบแชต', 'Delete chat'), danger: true, onClick: function (e) { e.stopPropagation(); props.onAction && props.onAction('delete'); } }
        ]
      }) : null);
  }

  function Sidebar(props) {
    var N = useNavL(), L = useL();
    var _q = useState(''), q = _q[0], setQ = _q[1];
    var chats = (props.chats || []).filter(function (c) { return !q || c.title.toLowerCase().indexOf(q.toLowerCase()) >= 0; });
    var groups = [
      { label: N('ปักหมุด', 'Pinned'), items: chats.filter(function (c) { return c.pinned; }) },
      { label: N('วันนี้', 'Today'), items: chats.filter(function (c) { return !c.pinned && c.when === 'today'; }) },
      { label: N('7 วันที่ผ่านมา', 'Previous 7 days'), items: chats.filter(function (c) { return !c.pinned && c.when !== 'today'; }) }
    ];
    var perms = props.perms || {};
    var nav = [
      { id: 'chat', icon: 'chat', label: N('แชต AI', 'AI conversations'), perm: 'chat.use' },
      { id: 'knowledge', icon: 'book', label: N('คลังความรู้', 'Knowledge'), perm: 'documents.use' },
      { id: 'files', icon: 'file-plus', label: N('สร้างไฟล์', 'Create files'), perm: 'chat.use' },
      { id: 'org', icon: 'building', label: N('องค์กร', 'Organization'), perm: 'users.list' },
      { id: 'settings', icon: 'settings', label: N('ตั้งค่า', 'Settings') }
    ];
    var activeNav = props.active === 'thread' ? 'chat' : props.active === 'usage' ? 'org' : props.active;
    return h('aside', { className: 'ba-sidebar', 'aria-label': 'Main navigation' },
      h('div', { className: 'ba-sidebar-top' },
        h('div', { className: 'ba-sidebar-brand' }, h(Logo, { theme: 'dark', height: 22 }), props.onClose ? h(IconButton, { icon: 'x', label: 'Close menu', onClick: props.onClose }) : null),
        h(Button, { variant: 'primary', icon: 'plus', block: true, className: 'ba-btn-newchat', onClick: props.onNewChat, disabled: perms['chat.use'] === false }, N('แชตใหม่', 'New chat'))),
      h('nav', { className: 'ba-nav' }, nav.map(function (n) {
        return h(NavItem, { key: n.id, icon: n.icon, label: n.label, active: activeNav === n.id, locked: n.perm && perms[n.perm] === false, lockedHint: N('ไม่มีสิทธิ์ใช้งาน — ติดต่อผู้ดูแลระบบ', 'No access — contact your administrator'), onClick: function () { props.onNavigate && props.onNavigate(n.id); } });
      })),
      h('div', { className: 'ba-sidebar-section' },
        h('div', { className: 'ba-sidebar-label' }, h('span', null, N('แชตล่าสุด', 'Recent chats'))),
        h('div', { style: { padding: '0 4px 4px' } }, h(TextInput, { icon: 'search', size: 'sm', placeholder: N('ค้นหาแชต', 'Search chats'), value: q, onChange: function (e) { setQ(e.target.value); }, 'aria-label': N('ค้นหาแชต', 'Search chats') })),
        h('div', { className: 'ba-chatlist' },
          chats.length === 0 ? h('div', { className: 'ba-empty-mini' }, q ? N('ไม่พบแชตที่ตรงกับ “' + q + '”', 'No chats match “' + q + '”') : N('ยังไม่มีแชต เริ่มแชตใหม่ได้จากปุ่มด้านบน', 'No chats yet. Start one with New chat.')) :
            groups.map(function (g) {
              if (!g.items.length) return null;
              return h(Fragment, { key: g.label }, h('div', { className: 'ba-chatlist-group' }, g.label), g.items.map(function (c) {
                return h(ChatListItem, { key: c.id, title: c.title, pinned: c.pinned, active: props.currentChat === c.id, menuOpen: props.menuChat === c.id, renaming: props.renameChat === c.id, onOpen: function () { props.onOpenChat && props.onOpenChat(c.id); }, onMenu: function () { props.onChatMenu && props.onChatMenu(props.menuChat === c.id ? null : c.id); }, onAction: function (a) { props.onChatAction && props.onChatAction(c.id, a); }, onRenamed: function (v) { props.onChatAction && props.onChatAction(c.id, 'renamed', v); } });
              }));
            }))),
      h('div', { className: 'ba-userbox' },
        h(Avatar, { name: props.user ? props.user.name : 'U', size: 34 }),
        h('div', { className: 'ba-userbox-text' }, h('div', { className: 'ba-userbox-name' }, props.user && props.user.name), h('div', { className: 'ba-userbox-mail' }, props.user && props.user.email)),
        h(IconButton, { icon: 'logout', label: N('ออกจากระบบ', 'Sign out'), onClick: props.onSignOut })));
  }

  function AppHeader(props) {
    var L = useL();
    return h('header', { className: cx('ba-header', props.quiet && 'ba-header-quiet') },
      h('div', { className: 'ba-header-title' }, props.title),
      props.children,
      h(IconButton, { icon: 'settings', label: L('ตั้งค่า', 'Settings'), onClick: props.onSettings, active: props.settingsActive }));
  }

  function MobileTopBar(props) {
    var L = useL();
    return h('header', { className: 'ba-topbar' },
      h(IconButton, { icon: 'menu', size: 'lg', label: L('เปิดเมนูและแชตล่าสุด', 'Open menu and recent chats'), onClick: props.onMenu }),
      h('div', { className: 'ba-topbar-title' }, props.title),
      props.onNewChat ? h(IconButton, { icon: 'edit', size: 'lg', label: L('แชตใหม่', 'New chat'), onClick: props.onNewChat }) : h('span', { style: { width: 44 } }));
  }

  function AppShell(props) {
    var ui = useUI();
    var _d = useState(!!props.drawerOpen), drawer = _d[0], setDrawer = _d[1];
    useEffect(function () { setDrawer(!!props.drawerOpen); }, [props.drawerOpen]);
    var side = function (extra) { return h(Sidebar, Object.assign({}, props.sidebar, extra || {})); };
    if (ui.mobile) {
      return h('div', { className: 'ba-shell ba-is-mobile', style: { flexDirection: 'column' } },
        h(MobileTopBar, { title: props.title, onMenu: function () { setDrawer(true); }, onNewChat: props.sidebar && props.sidebar.onNewChat }),
        h('main', { className: 'ba-main' }, props.children),
        drawer ? h(Fragment, null, h('div', { className: 'ba-drawer-scrim', onClick: function () { setDrawer(false); } }),
          h('div', { className: 'ba-drawer' }, side({
            onClose: function () { setDrawer(false); },
            onNavigate: function (r) { setDrawer(false); props.sidebar.onNavigate(r); },
            onOpenChat: function (id) { setDrawer(false); props.sidebar.onOpenChat(id); },
            onNewChat: function () { setDrawer(false); props.sidebar.onNewChat(); }
          }))) : null,
        props.overlay);
    }
    return h('div', { className: 'ba-shell' }, side(),
      h('main', { className: 'ba-main' }, props.header === false ? null : h(AppHeader, { title: props.title, quiet: props.quietHeader, onSettings: props.onSettings, settingsActive: props.sidebar && props.sidebar.active === 'settings' }, props.headerExtra), props.children),
      props.overlay);
  }

  /* ---------------- chat pieces ---------------- */
  function PlusMenu(props) {
    var L = useL();
    return h(Menu, {
      label: L('เพิ่มลงในข้อความ', 'Add to message'), items: [
        { icon: 'paperclip', label: L('เพิ่มรูปและไฟล์', 'Add photos & files'), hint: L('จากเครื่องหรือวาง (paste) · ไม่เกิน 5 MB', 'From device or paste · up to 5 MB'), onClick: function () { props.onPick && props.onPick('file'); } },
        { icon: 'library', label: L('เพิ่มจากไลบรารี', 'Add from library'), hint: L('เลือกเอกสาร Knowledge ที่พร้อมใช้', 'Pick a ready Knowledge document'), onClick: function () { props.onPick && props.onPick('library'); } },
        { icon: 'image', label: L('สร้างรูปภาพ', 'Create image'), hint: L('เปิด Create files พร้อม prompt นี้ (PNG)', 'Opens Create files with this prompt (PNG)'), onClick: function () { props.onPick && props.onPick('image'); } },
        '-',
        { icon: 'globe', label: L('ค้นหาเว็บ', 'Search the web'), hint: L('ให้คำตอบอ้างอิงแหล่งข้อมูลบนเว็บ', 'Answers cite web sources'), onClick: function () { props.onPick && props.onPick('web'); }, end: h('span', { className: 'ba-switch-track', 'aria-checked': props.web ? 'true' : 'false', 'aria-hidden': true }) }
      ]
    });
  }

  function LibraryPicker(props) {
    var L = useL();
    var _q = useState(''), q = _q[0], setQ = _q[1];
    var docs = (props.docs || []).filter(function (d) { return d.status === 'ready' && (!q || d.name.toLowerCase().indexOf(q.toLowerCase()) >= 0); });
    return h('div', { className: 'ba-menu', style: { width: 360, padding: 8 } },
      h('div', { style: { padding: '4px 4px 8px' } }, h(TextInput, { icon: 'search', size: 'sm', autoFocus: true, placeholder: L('ค้นหาชื่อเอกสาร', 'Search document name'), value: q, onChange: function (e) { setQ(e.target.value); } })),
      (props.docs || []).filter(function (d) { return d.status === 'ready'; }).length === 0 ?
        h('div', { style: { padding: '16px 10px', textAlign: 'center' } }, h('div', { style: { fontWeight: 500 } }, L('ยังไม่มีเอกสารที่พร้อมใช้', 'No ready documents yet')), h('div', { className: 'ba-t-small ba-muted', style: { margin: '4px 0 12px' } }, L('อัปโหลดเอกสารใน Knowledge ก่อน แล้วกลับมาเลือกที่นี่', 'Upload to Knowledge first, then pick it here.')), h(Button, { size: 'sm', icon: 'upload', onClick: props.onUpload }, L('ไปหน้าอัปโหลด', 'Go to upload'))) :
        docs.length === 0 ? h('div', { className: 'ba-t-small ba-muted', style: { padding: 12 } }, L('ไม่พบเอกสารที่ตรงกับคำค้น', 'No documents match')) :
          docs.map(function (d) {
            return h('button', { key: d.id, type: 'button', className: 'ba-menu-item', onClick: function () { props.onSelect && props.onSelect(d); } },
              h(FileType, { ext: d.ext, size: 30 }), h('span', { className: 'ba-menu-item-text' }, h('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, d.name), h('span', { className: 'ba-menu-item-hint' }, d.size + ' · v' + d.version)),
              props.selected === d.id ? h(Icon, { name: 'check', size: 18, style: { color: 'var(--brand-strong)' } }) : null);
          }));
  }

  function ModelPicker(props) {
    var L = useL();
    var _o = useState(false), open = _o[0], setOpen = _o[1];
    var models = props.models || [];
    var cur = models.filter(function (m) { return m.id === props.value; })[0] || models[0] || { name: '—' };
    return h('div', { className: cx('ba-plusmenu-wrap', props.below && 'ba-pop-below') },
      h('button', { type: 'button', className: 'ba-toolchip', 'aria-haspopup': 'menu', 'aria-expanded': open, onClick: function () { setOpen(!open); } }, h(Icon, { name: 'sparkles', size: 15 }), cur.name, h(Icon, { name: 'chevron-down', size: 14 })),
      open ? h(Menu, {
        label: L('โมเดลที่คุณมีสิทธิ์ใช้', 'Models you can use'), style: { width: 280 }, items: models.map(function (m) {
          return { label: m.name, hint: m.hint, icon: 'sparkles', end: m.id === cur.id ? h(Icon, { name: 'check', size: 17, style: { color: 'var(--brand-strong)' } }) : m.isDefault ? h('span', { className: 'ba-badge ba-badge-neutral' }, L('ค่าเริ่มต้น', 'Default')) : null, onClick: function () { setOpen(false); props.onChange && props.onChange(m.id); } };
        })
      }) : null);
  }

  function Composer(props) {
    var L = useL(), ui = useUI();
    var hero = props.size === 'hero';
    var atts = props.attachments || [];
    return h('div', null,
      h('div', { className: cx('ba-composer', hero && 'ba-composer-hero', props.dragging && 'is-drag') },
        atts.length ? h('div', { className: 'ba-composer-attach' }, atts.map(function (a) { return h(Attachment, Object.assign({ key: a.id }, a, { onRemove: function () { props.onRemoveAttachment && props.onRemoveAttachment(a.id); } })); })) : null,
        h('textarea', { rows: hero ? 3 : 1, value: props.value, placeholder: props.placeholder || L('พิมพ์คำถาม หรือวางไฟล์เพื่อให้ช่วยสรุป…', 'Ask anything, or paste a file to summarise…'), onChange: function (e) { props.onChange && props.onChange(e.target.value); }, onKeyDown: function (e) { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); if (!props.streaming && props.onSend) props.onSend(); } }, 'aria-label': L('ข้อความถึง BenterAI', 'Message BenterAI'), disabled: props.disabled }),
        h('div', { className: 'ba-composer-bar' },
          h('div', { className: 'ba-plusmenu-wrap' + (props.menuBelow ? ' ba-pop-below' : '') },
            h(IconButton, { icon: 'plus', variant: 'outline', label: L('เพิ่มไฟล์ ไลบรารี รูปภาพ หรือค้นเว็บ', 'Add files, library, image or web search'), 'aria-haspopup': 'menu', 'aria-expanded': !!props.menu, onClick: function () { props.onMenu && props.onMenu(props.menu ? null : 'plus'); } }),
            props.menu === 'plus' ? h(PlusMenu, { web: props.web, onPick: props.onPick }) : null,
            props.menu === 'library' ? h(LibraryPicker, { docs: props.docs, selected: props.kbDoc, onSelect: props.onPickDoc, onUpload: props.onGoUpload }) : null),
          props.web ? h('button', { type: 'button', className: 'ba-toolchip', 'aria-pressed': 'true', onClick: function () { props.onPick && props.onPick('web'); }, title: L('ปิดการค้นเว็บ', 'Turn off web search') }, h(Icon, { name: 'globe', size: 15 }), L('ค้นเว็บ', 'Web search'), h(Icon, { name: 'x', size: 13 })) : null,
          h('span', { className: 'grow' }),
          h(ModelPicker, { models: props.models, value: props.model, onChange: props.onModel, below: props.menuBelow }),
          props.streaming ? h(IconButton, { icon: 'stop', variant: 'stop', label: L('หยุดตอบ', 'Stop generating'), onClick: props.onStop })
            : h(IconButton, { icon: 'arrow-up', variant: 'primary', label: L('ส่งข้อความ', 'Send message'), disabled: !props.value || atts.some(function (a) { return a.status === 'uploading' || a.status === 'reading'; }), onClick: props.onSend }))),
      props.showKnowledge !== false ? h('div', { className: 'ba-composer-foot' },
        h('span', { className: 'ba-t-small ba-muted', style: { display: 'inline-flex', alignItems: 'center', gap: 6 } }, h(Icon, { name: 'book', size: 15 }), 'Knowledge'),
        h(Segmented, {
          size: 'sm', value: props.kbMode || 'none', onChange: props.onKbMode, label: 'Knowledge', options: [
            { value: 'none', label: L('ไม่ใช้เอกสาร', 'No documents') },
            { value: 'all', label: L('ทุกเอกสารที่พร้อมใช้', 'All ready documents') },
            { value: 'one', label: L('เลือก 1 ฉบับ', 'One document') }]
        }),
        props.kbMode === 'one' && !ui.mobile ? h(Select, { size: 'sm', value: props.kbDoc || '', wrapStyle: { minWidth: 220 }, onChange: function (e) { var d = (props.docs || []).filter(function (x) { return x.id === e.target.value; })[0]; d && props.onPickDoc && props.onPickDoc(d); }, options: [{ value: '', label: L('— เลือกเอกสาร —', '— Pick a document —') }].concat((props.docs || []).filter(function (d) { return d.status === 'ready'; }).map(function (d) { return { value: d.id, label: d.name }; })) }) : null) : null,
      props.note !== false ? h('div', { className: 'ba-composer-note' }, L('ข้อความและไฟล์ที่ส่งจะถูกประมวลผลโดยโมเดล AI ภายนอกตามนโยบายข้อมูลขององค์กร · ตรวจสอบคำตอบก่อนนำไปใช้', 'Messages and files are processed by an external AI model under your organisation’s data policy · Check answers before use')) : null);
  }

  function renderSegments(segs, limit, onCite, openCite) {
    var used = 0, out = [];
    for (var i = 0; i < segs.length; i++) {
      var s = segs[i];
      if (limit != null && used >= limit) break;
      if (typeof s === 'string' || s.b) {
        var txt = typeof s === 'string' ? s : s.b;
        var take = limit == null ? txt : txt.slice(0, Math.max(0, limit - used));
        used += take.length;
        out.push(typeof s === 'string' ? take : h('strong', { key: i }, take));
      } else if (s.c) {
        (function (n) { out.push(h('button', { key: i, type: 'button', className: 'ba-cite', 'aria-expanded': openCite === n ? 'true' : 'false', 'aria-label': 'Source ' + n, onClick: function () { onCite && onCite(n); } }, n)); })(s.c);
      }
    }
    return { nodes: out, used: used };
  }

  function SourceList(props) {
    var L = useL();
    var open = props.open;
    var src = (props.sources || []).filter(function (s) { return s.n === open; })[0];
    return h('div', { className: 'ba-sources' },
      h('div', { className: 'ba-sources-label' }, L('แหล่งอ้างอิง', 'Sources') + ' · ' + (props.sources || []).length),
      h('div', { className: 'ba-sources-list' }, (props.sources || []).map(function (s) {
        return h('button', { key: s.n, type: 'button', className: cx('ba-source', open === s.n && 'is-open'), onClick: function () { props.onOpen && props.onOpen(open === s.n ? null : s.n); } },
          h('span', { className: 'ba-source-n' }, s.n),
          h('span', { className: 'ba-source-text' }, h('div', { className: 'ba-source-title' }, s.title),
            h('div', { className: 'ba-source-meta' }, h(Icon, { name: s.type === 'web' ? 'globe' : 'book', size: 12 }), s.type === 'web' ? s.domain : L('หน้า ' + s.page, 'Page ' + s.page))));
      })),
      src ? h('div', { className: 'ba-source-pop' },
        h('div', { className: 'ba-row ba-gap-2', style: { justifyContent: 'space-between' } }, h('strong', null, src.title + (src.page ? L(' · หน้า ' + src.page, ' · page ' + src.page) : '')), h(IconButton, { icon: 'x', size: 'sm', label: 'Close', onClick: function () { props.onOpen && props.onOpen(null); } })),
        h('blockquote', { dangerouslySetInnerHTML: { __html: src.excerpt } }),
        h('div', { className: 'ba-row ba-gap-3' }, src.type === 'web' ? h('a', { className: 'ba-link', href: '#', onClick: function (e) { e.preventDefault(); } }, L('เปิดหน้าเว็บ', 'Open page'), ' ', h(Icon, { name: 'external', size: 13 })) : h('button', { type: 'button', className: 'ba-link' }, L('ดาวน์โหลดเอกสาร (v' + (src.version || 1) + ')', 'Download document (v' + (src.version || 1) + ')')))) : null);
  }

  function Message(props) {
    var L = useL();
    if (props.role === 'user') {
      return h('div', { className: 'ba-msg ba-msg-user' }, h('div', { className: 'ba-stack', style: { alignItems: 'flex-end', maxWidth: '100%' } },
        props.files && props.files.length ? h('div', { className: 'ba-msg-files' }, props.files.map(function (f, i) { return h(Attachment, Object.assign({ key: i }, f)); })) : null,
        h('div', { className: 'ba-msg-body' }, props.text)));
    }
    var paras = props.paragraphs || [];
    var limit = props.streaming ? (props.revealed || 0) : null;
    var budget = limit, body = [];
    for (var i = 0; i < paras.length; i++) {
      if (budget != null && budget <= 0) break;
      var r = renderSegments(paras[i], budget, props.onCite, props.openSource);
      body.push(h('p', { key: i }, r.nodes, props.streaming && (budget - r.used <= 0 || i === paras.length - 1) ? h('span', { className: 'ba-caret', 'aria-hidden': true }) : null));
      if (budget != null) budget -= r.used;
    }
    return h('div', { className: 'ba-msg ba-msg-assistant' },
      h(Avatar, { spark: true, size: 30 }),
      h('div', { className: 'ba-msg-body' },
        props.status ? h('div', { className: 'ba-msg-status' }, h(Spinner, { size: 13 }), props.status) : null,
        props.streaming && !props.revealed ? h('div', { className: 'ba-msg-status' }, h(Spinner, { size: 13 }), L('กำลังค้นหาในเอกสารและเรียบเรียงคำตอบ…', 'Searching documents and composing the answer…')) : null,
        body,
        props.error ? h(Alert, { tone: 'danger', title: props.error.title, action: props.onRetry ? h(Button, { size: 'sm', icon: 'refresh', onClick: props.onRetry }, L('ส่งอีกครั้ง', 'Retry')) : null }, props.error.body) : null,
        !props.streaming && props.sources && props.sources.length ? h(SourceList, { sources: props.sources, open: props.openSource, onOpen: props.onCite }) : null,
        !props.streaming && !props.error ? h('div', { className: 'ba-msg-meta' }, h(IconButton, { icon: 'copy', size: 'sm', label: L('คัดลอกคำตอบ', 'Copy answer') }), h('span', null, props.meta)) : null));
  }

  function DocumentRow(props) {
    var L = useL(); var d = props.doc;
    return h('div', { className: 'ba-docrow' },
      h(FileType, { ext: d.ext }),
      h('div', { className: 'ba-docrow-main' },
        h('div', { className: 'ba-docrow-title' }, d.name),
        h('div', { className: 'ba-docrow-meta' }, h('span', null, d.size), h('span', null, 'v' + d.version), h('span', null, d.date), h(StatusBadge, { status: d.status, progress: d.status === 'processing' ? d.progress : null })),
        d.status === 'processing' ? h(ProgressBar, { value: d.progress, label: 'OCR' }) : null,
        d.status === 'failed' ? h('div', { className: 'ba-t-small', style: { color: 'var(--danger)' } }, d.error) : null),
      h(IconButton, { icon: 'more', label: L('ตัวเลือกเอกสาร', 'Document options'), onClick: props.onMenu }));
  }

  /* ---------------- sample data (fictional organisation) ---------------- */
  var DATA = {
    org: 'Siam Demo Co., Ltd.',
    admin: { name: 'ศิริพร วงศ์ไทย', email: 'siriporn@siamdemo.co.th' },
    member: { name: 'ธนกร มีสุข', email: 'thanakorn@siamdemo.co.th' },
    chats: [
      { id: 'c1', title: 'สรุปนโยบายลาพักร้อน 2026', pinned: true, when: 'today' },
      { id: 'c2', title: 'ร่างอีเมลแจ้งลูกค้าเรื่องปรับราคา', when: 'today' },
      { id: 'c3', title: 'วิเคราะห์ยอดขาย Q3 จากไฟล์ CSV', when: 'today' },
      { id: 'c4', title: 'แผน Content LinkedIn เดือนพฤศจิกายน', when: 'week' },
      { id: 'c5', title: 'เปรียบเทียบ CDP 3 ราย สำหรับทีมการตลาด', when: 'week' },
      { id: 'c6', title: 'Checklist onboarding พนักงานใหม่', when: 'week' }
    ],
    models: [
      { id: 'm1', name: 'GPT-5.1', hint: 'ค่าเริ่มต้นขององค์กร · งานทั่วไปและเอกสาร', isDefault: true, enabled: true, groups: ['All staff'], fallback: false },
      { id: 'm2', name: 'GPT-5 mini', hint: 'เร็วและประหยัดโควตา', enabled: true, groups: ['All staff'], fallback: true },
      { id: 'm3', name: 'GPT-4.1', hint: 'สำหรับทีมที่ได้รับสิทธิ์', enabled: true, groups: ['Marketing', 'Administrators'] },
      { id: 'm4', name: 'o4-mini', hint: 'ปิดใช้งานอยู่', enabled: false, groups: [] }
    ],
    docs: [
      { id: 'd1', name: 'นโยบายลาพักร้อน 2026.pdf', ext: 'pdf', size: '2.4 MB', version: 3, date: '24 ต.ค. 2026', status: 'ready', owner: 'ศิริพร ว.', shares: [{ g: 'HR', p: 'edit' }, { g: 'All staff', p: 'view' }] },
      { id: 'd2', name: 'คู่มือพนักงาน_ฉบับสแกน.pdf', ext: 'pdf', size: '18.6 MB', version: 1, date: '26 ต.ค. 2026', status: 'processing', progress: 42, note: 'OCR หน้า 21/50', owner: 'ศิริพร ว.', shares: [] },
      { id: 'd3', name: 'ยอดขายรายเดือน_Q3.csv', ext: 'csv', size: '340 KB', version: 2, date: '20 ต.ค. 2026', status: 'ready', owner: 'ธนกร ม.', shares: [{ g: 'Sales', p: 'view' }] },
      { id: 'd4', name: 'Product_FAQ.md', ext: 'md', size: '48 KB', version: 5, date: '18 ต.ค. 2026', status: 'ready', owner: 'ศิริพร ว.', shares: [{ g: 'Marketing', p: 'edit' }, { g: 'Sales', p: 'view' }] },
      { id: 'd5', name: 'สัญญาเช่าอาคาร_2019_สแกน.pdf', ext: 'pdf', size: '31.2 MB', version: 1, date: '15 ต.ค. 2026', status: 'failed', error: 'อ่านไม่สำเร็จ: ไฟล์ถูกป้องกันด้วยรหัสผ่าน', owner: 'ศิริพร ว.', shares: [] },
      { id: 'd6', name: 'api-spec.json', ext: 'json', size: '120 KB', version: 1, date: '26 ต.ค. 2026', status: 'pending', owner: 'ธนกร ม.', shares: [] }
    ],
    artifacts: [
      { id: 'a1', name: 'สรุปผลประชุมบอร์ด_ต.ค.pdf', ext: 'pdf', model: 'GPT-5.1', date: '26 ต.ค. 2026 · 09:12', status: 'ready', size: '412 KB' },
      { id: 'a2', name: 'Proposal_Template.docx', ext: 'docx', model: 'GPT-5.1', date: '26 ต.ค. 2026 · 09:40', status: 'processing' },
      { id: 'a3', name: 'landing-promo-ปลายปี.html', ext: 'html', model: 'GPT-4.1', date: '25 ต.ค. 2026 · 16:05', status: 'ready', size: '38 KB' },
      { id: 'a4', name: 'ภาพปก_newsletter.png', ext: 'png', model: 'GPT-5.1', date: '25 ต.ค. 2026 · 11:20', status: 'failed', error: 'สร้างภาพไม่สำเร็จ: prompt ขัดกับนโยบายเนื้อหา ลองปรับคำอธิบายใหม่' },
      { id: 'a5', name: 'รายงานสรุปลูกค้า_Q3.pdf', ext: 'pdf', model: 'GPT-5 mini', date: '26 ต.ค. 2026 · 09:41', status: 'pending' }
    ],
    users: [
      { id: 'u1', name: 'ศิริพร วงศ์ไทย', email: 'siriporn@siamdemo.co.th', groups: ['Administrators'], status: 'active', last: 'วันนี้ 09:15' },
      { id: 'u2', name: 'ธนกร มีสุข', email: 'thanakorn@siamdemo.co.th', groups: ['Sales', 'All staff'], status: 'active', last: 'วันนี้ 08:52' },
      { id: 'u3', name: 'ปวีณา ศรีสวัสดิ์', email: 'paweena@siamdemo.co.th', groups: ['Marketing', 'All staff'], status: 'active', last: 'เมื่อวาน' },
      { id: 'u4', name: 'กิตติ อินทร์แก้ว', email: 'kitti@siamdemo.co.th', groups: ['All staff'], status: 'pending-account', last: '—' },
      { id: 'u5', name: 'มานพ ทองดี', email: 'manop@siamdemo.co.th', groups: ['HR', 'All staff'], status: 'suspended', last: '3 ก.ย. 2026' },
      { id: 'u6', name: 'ณัฐธิดา แก้วมณี', email: 'nattida@siamdemo.co.th', groups: ['HR', 'All staff'], status: 'active', last: '2 วันก่อน' }
    ],
    groups: [
      { id: 'g1', name: 'Administrators', members: 2, perms: ['chat.use', 'documents.use', 'users.list', 'users.create', 'users.manage', 'groups.manage', 'models.manage', 'usage.manage', 'audit.read'] },
      { id: 'g2', name: 'HR', members: 6, perms: ['chat.use', 'documents.use', 'users.list'] },
      { id: 'g3', name: 'Marketing', members: 14, perms: ['chat.use', 'documents.use'] },
      { id: 'g4', name: 'Sales', members: 22, perms: ['chat.use', 'documents.use'] },
      { id: 'g5', name: 'All staff', members: 128, perms: ['chat.use'] }
    ],
    perms: [
      ['chat.use', 'ใช้แชตและ Create files', 'Use chat and Create files'],
      ['documents.use', 'ใช้ Knowledge', 'Use Knowledge'],
      ['users.list', 'ดูรายชื่อผู้ใช้', 'View users'],
      ['users.create', 'สร้างผู้ใช้', 'Create users'],
      ['users.manage', 'อนุมัติ / ระงับผู้ใช้', 'Approve / suspend users'],
      ['groups.manage', 'จัดการกลุ่มและสิทธิ์', 'Manage groups & permissions'],
      ['models.manage', 'จัดการโมเดล', 'Manage models'],
      ['usage.manage', 'ดูการใช้งานและตั้งโควตา', 'Usage & limits'],
      ['audit.read', 'อ่าน Audit log', 'Read audit log']
    ],
    audit: [
      { t: '26 ต.ค. 09:41', who: 'ศิริพร ว.', act: 'document.upload', target: 'คู่มือพนักงาน_ฉบับสแกน.pdf', ip: '10.2.14.8' },
      { t: '26 ต.ค. 09:15', who: 'ศิริพร ว.', act: 'auth.login', target: '—', ip: '10.2.14.8' },
      { t: '25 ต.ค. 17:02', who: 'ศิริพร ว.', act: 'model.policy.update', target: 'default > GPT-5.1', ip: '10.2.14.8' },
      { t: '25 ต.ค. 14:30', who: 'ธนกร ม.', act: 'document.share', target: 'ยอดขายรายเดือน_Q3.csv > Sales (view)', ip: '10.2.20.31' },
      { t: '25 ต.ค. 02:00', who: 'System', act: 'retention.cleanup', target: '214 messages, 18 files', ip: '—' },
      { t: '24 ต.ค. 10:11', who: 'ศิริพร ว.', act: 'user.suspend', target: 'manop@siamdemo.co.th', ip: '10.2.14.8' }
    ],
    usageDays: [320, 410, 380, 120, 90, 450, 520, 498, 470, 530, 140, 110, 560, 610, 590, 575, 620, 160, 130, 640, 660, 610, 680, 700, 150, 120],
    usageUsers: [
      { name: 'ปวีณา ศรีสวัสดิ์', group: 'Marketing', used: 1480, limit: 1500 },
      { name: 'ธนกร มีสุข', group: 'Sales', used: 1120, limit: 1500 },
      { name: 'ศิริพร วงศ์ไทย', group: 'Administrators', used: 860, limit: 0 },
      { name: 'ณัฐธิดา แก้วมณี', group: 'HR', used: 410, limit: 1000 },
      { name: 'กิตติ อินทร์แก้ว', group: 'All staff', used: 0, limit: 500 }
    ]
  };
  var ANSWER = {
    th: {
      q: 'พนักงานที่ทำงานครบ 3 ปี ลาพักร้อนได้กี่วัน และต้องแจ้งล่วงหน้ากี่วัน',
      paras: [
        ['ตามนโยบายลาพักร้อน 2026 พนักงานที่มีอายุงานครบ 3 ปีขึ้นไปมีสิทธิ์ลาพักร้อน ', { b: '12 วันทำการต่อปี' }, { c: 1 }, ' และต้องยื่นคำขอผ่านระบบล่วงหน้า ', { b: 'อย่างน้อย 7 วันทำการ' }, { c: 2 }],
        ['วันลาที่ใช้ไม่หมดสะสมไปปีถัดไปได้ไม่เกิน 6 วัน และต้องใช้ให้หมดภายในไตรมาสแรกของปีถัดไป', { c: 1 }]
      ]
    },
    en: {
      q: 'How many vacation days does an employee with 3 years of service get, and how much notice is required?',
      paras: [
        ['Under the 2026 Vacation Policy, employees with 3+ years of service are entitled to ', { b: '12 working days per year' }, { c: 1 }, ', and requests must be filed in the system ', { b: 'at least 7 working days in advance' }, { c: 2 }],
        ['Up to 6 unused days carry over to the next year and must be used within its first quarter.', { c: 1 }]
      ]
    }
  };
  var SOURCES_DOC = [
    { n: 1, type: 'doc', title: 'นโยบายลาพักร้อน 2026.pdf', page: 4, version: 3, excerpt: '“…พนักงานที่มีอายุงานตั้งแต่ 3 ปีขึ้นไป มีสิทธิ์ลาพักผ่อนประจำปี <mark>12 วันทำการ</mark> วันลาที่ไม่ได้ใช้สะสมได้ไม่เกิน 6 วัน…”' },
    { n: 2, type: 'doc', title: 'นโยบายลาพักร้อน 2026.pdf', page: 6, version: 3, excerpt: '“…การขอลาพักผ่อนต้องยื่นผ่านระบบ HR <mark>ล่วงหน้าไม่น้อยกว่า 7 วันทำการ</mark> และได้รับอนุมัติจากผู้บังคับบัญชา…”' }
  ];
  var WEB = {
    q: { th: 'สรุปแนวโน้ม Agentic AI ในงานการตลาดล่าสุด', en: 'Summarise the latest Agentic AI trends in marketing' },
    paras: {
      th: [['ภาพรวมล่าสุดชี้ว่าองค์กรเริ่มใช้ ', { b: 'AI Agent' }, ' ทำงานหลายขั้นตอนแทนการใช้แชตแบบถามตอบ เช่น วางแผนแคมเปญ สร้างคอนเทนต์ และรายงานผล', { c: 1 }, ' โดยประเด็นที่ผู้บริหารให้ความสำคัญคือ Data Foundation และ Governance', { c: 2 }]],
      en: [['Recent coverage shows organisations moving from Q&A chat to ', { b: 'AI agents' }, ' that run multi-step work such as campaign planning, content production and reporting', { c: 1 }, ', with leaders prioritising data foundations and governance', { c: 2 }]]
    },
    sources: [
      { n: 1, type: 'web', title: 'How marketing teams deploy AI agents', domain: 'news.example.com', excerpt: 'ตัวอย่างข้อความจากหน้าเว็บที่ใช้ตอบ — แสดงเฉพาะส่วนที่โมเดลอ้างอิง' },
      { n: 2, type: 'web', title: 'Governance checklist for enterprise AI', domain: 'research.example.org', excerpt: 'ตัวอย่างข้อความจากหน้าเว็บที่ใช้ตอบ — แสดงเฉพาะส่วนที่โมเดลอ้างอิง' }
    ]
  };
  function segLen(paras) { var n = 0; paras.forEach(function (p) { p.forEach(function (s) { n += typeof s === 'string' ? s.length : s.b ? s.b.length : 0; }); }); return n; }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }

  /* ---------------- page helpers ---------------- */
  function PageHead(props) {
    return h('div', { className: 'ba-pagehead' },
      h('div', { className: 'ba-pagehead-text' }, props.crumb ? h('div', { className: 'ba-breadcrumb' }, props.crumb) : null, h('h1', { className: 'ba-t-h1' }, props.title), props.sub ? h('div', { className: 'ba-muted' }, props.sub) : null),
      props.actions ? h('div', { className: 'ba-row ba-gap-2 ba-wrap' }, props.actions) : null);
  }
  function NoAccess(props) {
    var L = useL();
    return h(EmptyState, { icon: 'lock', tone: 'lock', title: L('คุณยังไม่มีสิทธิ์ใช้งานส่วนนี้', 'You don’t have access to this area'), actions: h(Button, { icon: 'chat', onClick: props.onBack }, L('กลับไปหน้าแชต', 'Back to chat')) },
      L('ส่วนนี้ต้องใช้สิทธิ์ ', 'This area needs the '), h('code', { className: 'ba-kbd' }, props.perm), L(' โปรดติดต่อผู้ดูแลระบบขององค์กรเพื่อขอสิทธิ์', ' permission. Ask your organisation’s administrator for access.'));
  }

  /* ---------------- screens ---------------- */
  function AuthLayout(props) {
    var L = useL(), ui = useUI();
    return h('div', { className: 'ba-auth' + (ui.mobile ? ' ba-is-mobile' : ''), style: { height: '100%', overflowY: 'auto' } },
      h('section', { className: 'ba-auth-brand' },
        h(Logo, { theme: 'dark', height: 40 }),
        h('div', { className: 'ba-stack ba-gap-6' },
          h('div', { className: 'ba-stack ba-gap-3' },
            h('div', { className: 'ba-t-display' }, L('พื้นที่ทำงาน AI สำหรับองค์กร', 'The AI workspace for your organisation')),
            h('div', { className: 'ba-muted', style: { fontSize: 'var(--ba-fs-body-lg)', maxWidth: 460 } }, L('แชตกับโมเดล AI บนเอกสารขององค์กร ภายใต้สิทธิ์ โควตา และนโยบายข้อมูลที่ผู้ดูแลกำหนด', 'Chat with AI over your organisation’s documents — within the permissions, quotas and data policy your administrators set.'))),
          h('div', { className: 'ba-auth-rule' }),
          h('ul', { className: 'ba-auth-points' },
            [['book', L('ตอบจาก Knowledge พร้อมอ้างอิงชื่อเอกสารและเลขหน้า', 'Answers from Knowledge with document and page citations')],
            ['shield', L('สิทธิ์ตามกลุ่ม · Audit log · นโยบายเก็บรักษาข้อมูล', 'Group permissions · Audit log · Data retention policy')],
            ['file-plus', L('สร้าง PDF, Word, HTML และรูปภาพจาก prompt', 'Generate PDF, Word, HTML and images from a prompt')]].map(function (p) { return h('li', { key: p[0] }, h(Icon, { name: p[0], size: 18 }), h('span', null, p[1])); }))),
        h('div', { className: 'ba-row ba-gap-3 ba-t-small ba-muted', style: { justifyContent: 'space-between' } }, h('a', { className: 'ba-link', href: '#', onClick: function (e) { e.preventDefault(); } }, 'benterai.com'), h('span', null, '© 2026 BenterAI'))),
      h('section', { className: 'ba-auth-form' }, h('div', { className: 'ba-auth-card' },
        ui.mobile ? h(Logo, { height: 26 }) : null,
        props.children,
        ui.mobile ? h('div', { className: 'ba-t-small ba-muted', style: { textAlign: 'center' } }, h('a', { className: 'ba-link', href: '#', onClick: function (e) { e.preventDefault(); } }, L('กลับไปที่ benterai.com', 'Back to benterai.com'))) : null)));
  }

  function LoginScreen(props) {
    var L = useL(); var v = props.variant || 'default';
    var _s = useState(false), show = _s[0], setShow = _s[1];
    var _e = useState(v === 'default' ? '' : 'siriporn@siamdemo.co.th'), email = _e[0], setEmail = _e[1];
    var _p = useState(v === 'default' ? '' : '••••••••••••'), pw = _p[0], setPw = _p[1];
    var _l = useState(v === 'loading'), loading = _l[0], setLoading = _l[1];
    var errors = {
      error: { tone: 'danger', t: L('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'Incorrect email or password'), b: L('ตรวจสอบอีกครั้ง หรือรีเซ็ตรหัสผ่าน', 'Check and try again, or reset your password.') },
      ratelimit: { tone: 'warning', t: L('ลองเข้าสู่ระบบหลายครั้งเกินไป', 'Too many sign-in attempts'), b: L('เพื่อความปลอดภัย กรุณารอ 5 นาทีแล้วลองใหม่', 'For your security, wait 5 minutes and try again.') },
      suspended: { tone: 'danger', t: L('บัญชีนี้ถูกระงับการใช้งาน', 'This account is suspended'), b: L('ติดต่อผู้ดูแลระบบขององค์กรเพื่อเปิดใช้งานอีกครั้ง', 'Contact your organisation’s administrator to reactivate it.') },
      pending: { tone: 'warning', t: L('บัญชีกำลังรอผู้ดูแลอนุมัติ', 'Your account is waiting for approval'), b: L('คุณจะเข้าสู่ระบบได้เมื่อผู้ดูแลอนุมัติ — แจ้งผู้ดูแลหากรอนานเกินไป', 'You can sign in once an administrator approves it.') }
    };
    var err = errors[v];
    return h(AuthLayout, null,
      h('div', { className: 'ba-stack ba-gap-1' }, h('h1', { className: 'ba-t-h2' }, L('เข้าสู่ระบบ', 'Sign in')), h('div', { className: 'ba-muted' }, L('ใช้อีเมลและรหัสผ่านที่องค์กรสร้างให้คุณ', 'Use the email and password your organisation issued.'))),
      err ? h(Alert, { tone: err.tone, title: err.t }, err.b) : null,
      h('form', { className: 'ba-stack ba-gap-4', onSubmit: function (e) { e.preventDefault(); setLoading(true); setTimeout(function () { setLoading(false); props.onLogin && props.onLogin(); }, 700); } },
        h(Field, { label: L('อีเมล', 'Email') }, h(TextInput, { type: 'email', icon: 'mail', placeholder: 'name@company.co.th', value: email, onChange: function (e) { setEmail(e.target.value); }, invalid: v === 'error', autoComplete: 'username' })),
        h(Field, { label: h('span', { className: 'ba-row', style: { justifyContent: 'space-between' } }, L('รหัสผ่าน', 'Password'), h('button', { type: 'button', className: 'ba-link ba-t-small', style: { fontWeight: 400 }, onClick: props.onForgot }, L('ลืมรหัสผ่าน?', 'Forgot password?'))) },
          h('span', { className: 'ba-input-wrap' }, h(Icon, { name: 'lock', size: 17 }), h('input', { className: 'ba-input', type: show ? 'text' : 'password', value: pw, placeholder: '••••••••••', onChange: function (e) { setPw(e.target.value); }, 'aria-invalid': v === 'error' ? 'true' : undefined, autoComplete: 'current-password' }),
            h(IconButton, { icon: 'eye', size: 'sm', label: show ? L('ซ่อนรหัสผ่าน', 'Hide password') : L('แสดงรหัสผ่าน', 'Show password'), onClick: function () { setShow(!show); }, style: { position: 'absolute', right: 6 } }))),
        h(Button, { variant: 'primary', size: 'lg', block: true, type: 'submit', loading: loading, disabled: v === 'ratelimit' }, loading ? L('กำลังเข้าสู่ระบบ…', 'Signing in…') : L('เข้าสู่ระบบ', 'Sign in'))),
      h('div', { className: 'ba-t-small ba-muted' }, L('ยังไม่มีบัญชี? ผู้ดูแลระบบขององค์กรเป็นผู้สร้างบัญชีให้', 'No account? Your organisation’s administrator creates it for you.')));
  }

  function ResetScreen(props) {
    var L = useL(); var _v = useState(props.variant || 'request'), v = _v[0], setV = _v[1];
    var _pw = useState(v === 'token-weak' ? 'abc12345' : ''), pw = _pw[0], setPw = _pw[1];
    var _pw2 = useState(''), pw2 = _pw2[0], setPw2 = _pw2[1];
    var back = h('button', { type: 'button', className: 'ba-link ba-t-small', onClick: props.onBack }, h(Icon, { name: 'chevron-left', size: 14 }), L(' กลับไปหน้าเข้าสู่ระบบ', ' Back to sign in'));
    if (v === 'request' || v === 'sent') return h(AuthLayout, null,
      h('div', { className: 'ba-stack ba-gap-1' }, h('h1', { className: 'ba-t-h2' }, L('รีเซ็ตรหัสผ่าน', 'Reset password')), h('div', { className: 'ba-muted' }, L('กรอกอีเมลของคุณ เราจะส่งลิงก์ตั้งรหัสผ่านใหม่ให้ ลิงก์มีอายุ 15 นาที', 'Enter your email and we’ll send a reset link. The link expires in 15 minutes.'))),
      v === 'sent' ? h(Alert, { tone: 'success', title: L('ตรวจสอบกล่องอีเมลของคุณ', 'Check your inbox') }, L('หากอีเมลนี้มีบัญชีในระบบ เราได้ส่งลิงก์รีเซ็ตไปแล้ว ตรวจสอบโฟลเดอร์ Spam ด้วย', 'If this email has an account, a reset link is on its way. Check your spam folder too.')) : null,
      h('form', { className: 'ba-stack ba-gap-4', onSubmit: function (e) { e.preventDefault(); setV('sent'); } },
        h(Field, { label: L('อีเมล', 'Email') }, h(TextInput, { type: 'email', icon: 'mail', defaultValue: v === 'sent' ? 'siriporn@siamdemo.co.th' : '', placeholder: 'name@company.co.th' })),
        h(Button, { variant: v === 'sent' ? 'secondary' : 'primary', size: 'lg', block: true, type: 'submit' }, v === 'sent' ? L('ส่งลิงก์อีกครั้ง', 'Send again') : L('ส่งลิงก์รีเซ็ต', 'Send reset link'))),
      back);
    if (v === 'done') return h(AuthLayout, null, h(EmptyState, { icon: 'check-circle', tone: 'brand', title: L('ตั้งรหัสผ่านใหม่เรียบร้อย', 'Password updated'), actions: h(Button, { variant: 'primary', onClick: props.onBack }, L('เข้าสู่ระบบ', 'Sign in')), style: { padding: '24px 0' } }, L('ใช้รหัสผ่านใหม่เพื่อเข้าสู่ระบบได้ทันที', 'Use your new password to sign in.')));
    if (v === 'token-error') return h(AuthLayout, null, h(EmptyState, { icon: 'clock', tone: 'danger', title: L('ลิงก์หมดอายุหรือถูกใช้ไปแล้ว', 'This link has expired or was already used'), actions: h(Button, { variant: 'primary', onClick: function () { setV('request'); } }, L('ขอลิงก์ใหม่', 'Request a new link')), style: { padding: '24px 0' } }, L('ลิงก์รีเซ็ตใช้ได้ครั้งเดียวภายใน 15 นาที', 'Reset links work once, within 15 minutes.')));
    var ok = pw.length >= 10, match = pw && pw === pw2;
    return h(AuthLayout, null,
      h('div', { className: 'ba-stack ba-gap-1' }, h('h1', { className: 'ba-t-h2' }, L('ตั้งรหัสผ่านใหม่', 'Set a new password')), h('div', { className: 'ba-muted' }, 'siriporn@siamdemo.co.th')),
      h('form', { className: 'ba-stack ba-gap-4', onSubmit: function (e) { e.preventDefault(); if (ok && match) setV('done'); } },
        h(Field, { label: L('รหัสผ่านใหม่', 'New password'), error: pw && !ok ? L('รหัสผ่านต้องยาวอย่างน้อย 10 ตัวอักษร', 'Use at least 10 characters') : null, hint: L('อย่างน้อย 10 ตัวอักษร', 'At least 10 characters') }, h(TextInput, { type: 'password', icon: 'lock', value: pw, invalid: pw && !ok, onChange: function (e) { setPw(e.target.value); } })),
        h('div', { className: 'ba-row ba-gap-2 ba-t-small', style: { color: ok ? 'var(--success)' : 'var(--ink-muted)' } }, h(Icon, { name: ok ? 'check-circle' : 'info', size: 15 }), L('ความยาว ' + pw.length + '/10 ตัวอักษรขึ้นไป', pw.length + '/10+ characters')),
        h(Field, { label: L('ยืนยันรหัสผ่านใหม่', 'Confirm new password'), error: pw2 && !match ? L('รหัสผ่านไม่ตรงกัน', 'Passwords don’t match') : null }, h(TextInput, { type: 'password', icon: 'lock', value: pw2, invalid: pw2 && !match, onChange: function (e) { setPw2(e.target.value); } })),
        h(Button, { variant: 'primary', size: 'lg', block: true, type: 'submit', disabled: !(ok && match) }, L('บันทึกรหัสผ่านใหม่', 'Save new password'))),
      back);
  }

  function ChatScreen(props) {
    var L = useL(), ui = useUI(), app = props.app;
    var c = app.composer, thread = app.thread;
    var composerEl = h(Composer, {
      size: thread.length ? 'docked' : 'hero', value: c.text, attachments: c.attachments, web: c.web, model: c.model, models: app.models, kbMode: c.kbMode, kbDoc: c.kbDoc, docs: app.docs, menu: c.menu, streaming: app.streaming,
      onChange: function (t) { app.setComposer({ text: t }); }, onMenu: function (m) { app.setComposer({ menu: m }); },
      onPick: app.onPick, onPickDoc: app.onPickDoc, onGoUpload: function () { app.navigate('knowledge'); }, onKbMode: function (m) { app.setComposer({ kbMode: m, menu: m === 'one' && ui.mobile ? 'library' : null }); },
      onModel: function (m) { app.setComposer({ model: m }); }, onRemoveAttachment: app.removeAttachment, onSend: app.send, onStop: app.stop, note: !ui.mobile || !thread.length
    });
    if (app.perms['chat.use'] === false) return h('div', { className: 'ba-content' }, h(NoAccess, { perm: 'chat.use', onBack: function () { app.navigate('settings'); } }));
    if (!thread.length) {
      return h(Fragment, null, h('div', { className: 'ba-content' },
        h('div', { className: 'ba-welcome' }, h('div', { className: 'ba-welcome-inner' },
          h('div', { className: 'ba-welcome-hello' },
            h('div', { className: 'ba-t-display' }, L('สวัสดี คุณ' + app.user.name.split(' ')[0], 'Hello, ' + (app.role === 'admin' ? 'Siriporn' : 'Thanakorn'))),
            h('div', { className: 'ba-muted', style: { fontSize: 'var(--ba-fs-body-lg)' } }, L('วันนี้ให้ BenterAI ช่วยงานอะไรดี', 'What can BenterAI help you with today?'))),
          h('div', { style: { width: '100%' } }, composerEl)))));
    }
    var msgs = thread.map(function (m, i) {
      if (m.role === 'user') return h(Message, { key: i, role: 'user', text: m.text, files: m.files });
      return h(Message, { key: i, role: 'assistant', paragraphs: m.paras, sources: m.sources, streaming: m.streaming, revealed: m.revealed, error: m.error, openSource: app.openSource, onCite: app.setOpenSource, onRetry: m.error ? app.retry : null, meta: m.meta, status: m.statusText });
    });
    return h(Fragment, null,
      h('div', { className: 'ba-content' }, h('div', { className: 'ba-thread' }, msgs)),
      h('div', { className: 'ba-dock' }, h('div', { className: 'ba-dock-inner' }, composerEl)));
  }

  function KnowledgeScreen(props) {
    var L = useL(), ui = useUI(), app = props.app, v = app.variant;
    var _f = useState('all'), f = _f[0], setF = _f[1];
    var _q = useState(''), q = _q[0], setQ = _q[1];
    if (app.perms['documents.use'] === false) return h('div', { className: 'ba-content' }, h(NoAccess, { perm: 'documents.use', onBack: function () { app.navigate('chat'); } }));
    var docs = app.docs.filter(function (d) { return (f === 'all' || (f === 'working' ? (d.status === 'processing' || d.status === 'pending') : d.status === f)) && (!q || d.name.toLowerCase().indexOf(q.toLowerCase()) >= 0); });
    var count = function (s) { return app.docs.filter(function (d) { return s === 'working' ? (d.status === 'processing' || d.status === 'pending') : d.status === s; }).length; };
    var head = h(PageHead, {
      title: L('คลังความรู้', 'Knowledge'), sub: L('เอกสารระยะยาวขององค์กรที่ใช้ตอบในแชต · TXT, Markdown, CSV, JSON, PDF ไม่เกิน 50 MB · PDF สแกนจะทำ OCR อัตโนมัติ', 'Long-term documents chat can answer from · TXT, Markdown, CSV, JSON, PDF up to 50 MB · scanned PDFs are OCR’d automatically'),
      actions: h(Button, { variant: 'primary', icon: 'upload', onClick: app.uploadDoc }, L('อัปโหลดเอกสาร', 'Upload document'))
    });
    var body;
    if (v === 'loading') body = h('div', { className: 'ba-table-wrap', style: { padding: 20 } }, h('div', { className: 'ba-stack ba-gap-4' }, [0, 1, 2, 3, 4].map(function (i) { return h('div', { key: i, className: 'ba-row ba-gap-3' }, h(Skeleton, { w: 36, h: 36, r: 4 }), h('div', { className: 'ba-grow ba-stack ba-gap-2' }, h(Skeleton, { w: '40%', h: 13 }), h(Skeleton, { w: '22%', h: 11 })), h(Skeleton, { w: 90, h: 22 })); })));
    else if (!app.docs.length) body = h('div', { className: 'ba-card' }, h(EmptyState, { icon: 'book', tone: 'brand', title: L('ยังไม่มีเอกสารใน Knowledge', 'No documents in Knowledge yet'), actions: h(Button, { variant: 'primary', icon: 'upload', onClick: app.uploadDoc }, L('อัปโหลดเอกสารแรก', 'Upload your first document')) }, L('อัปโหลดนโยบาย คู่มือ หรือข้อมูลสินค้า แล้วเลือกใช้ในแชตเพื่อให้คำตอบอ้างอิงเอกสารจริงพร้อมเลขหน้า', 'Upload policies, manuals or product data, then use them in chat for answers that cite real documents and pages.')));
    else {
      var menuFor = function (d) {
        return [
          { icon: 'download', label: L('ดาวน์โหลด', 'Download'), disabled: d.status !== 'ready' && d.status !== 'failed' },
          { icon: 'upload', label: L('อัปโหลดเวอร์ชันใหม่', 'Upload new version') },
          { icon: 'history', label: L('ดูเวอร์ชันทั้งหมด', 'Version history'), onClick: function () { app.openDialog('versions', d.id); } },
          { icon: 'users', label: L('แชร์ให้กลุ่ม', 'Share with groups'), onClick: function () { app.openDialog('share', d.id); } },
          '-',
          { icon: 'trash', label: L('ลบเอกสาร', 'Delete document'), danger: true, onClick: function () { app.openDialog('delete-doc', d.id); } }];
      };
      var rowMenu = function (d) {
        return h('div', { style: { position: 'relative' } }, h(IconButton, { icon: 'more', label: L('ตัวเลือก', 'Options'), onClick: function () { app.setDocMenu(app.docMenu === d.id ? null : d.id); } }),
          app.docMenu === d.id ? h(Menu, { items: menuFor(d), style: { position: 'absolute', right: 0, top: 40, width: 230 } }) : null);
      };
      body = h('div', { className: 'ba-stack ba-gap-4' },
        h('div', { className: cx('ba-dropzone', v === 'drag' && 'is-drag') },
          h('span', { className: 'ba-dropzone-icon' }, h(Icon, { name: 'upload', size: 22 })),
          h('div', { className: 'ba-grow' }, h('div', { style: { fontWeight: 500 } }, L('ลากไฟล์มาวางที่นี่ หรือ ', 'Drag files here or '), h('button', { type: 'button', className: 'ba-link', onClick: app.uploadDoc }, L('เลือกจากเครื่อง', 'browse'))), h('div', { className: 'ba-t-small ba-muted' }, L('การอัปโหลดชื่อเดิมซ้ำจะสร้างเวอร์ชันใหม่ ไม่ทับฉบับเก่า · แชตใช้เฉพาะเวอร์ชันปัจจุบัน', 'Re-uploading a file creates a new version — old versions stay downloadable; chat uses the current one')))),
        h('div', { className: 'ba-row ba-gap-3 ba-wrap', style: { justifyContent: 'space-between' } },
          h(Segmented, { value: f, onChange: setF, size: 'sm', options: [{ value: 'all', label: L('ทั้งหมด ', 'All ') + app.docs.length }, { value: 'ready', label: L('พร้อมใช้ ', 'Ready ') + count('ready') }, { value: 'working', label: L('กำลังทำ ', 'In progress ') + count('working') }, { value: 'failed', label: L('ล้มเหลว ', 'Failed ') + count('failed') }] }),
          h('div', { style: { width: ui.mobile ? '100%' : 280 } }, h(TextInput, { icon: 'search', size: 'sm', placeholder: L('ค้นหาชื่อเอกสาร', 'Search documents'), value: q, onChange: function (e) { setQ(e.target.value); } }))),
        ui.mobile ? h('div', { className: 'ba-doclist' }, docs.map(function (d) { return h(DocumentRow, { key: d.id, doc: d, onMenu: function () { app.openDialog('share', d.id); } }); })) :
          h(DataTable, {
            empty: h('div', { className: 'ba-muted', style: { padding: 24, textAlign: 'center' } }, L('ไม่มีเอกสารในตัวกรองนี้', 'No documents in this filter')),
            columns: [
              { label: L('เอกสาร', 'Document'), render: function (d) { return h('div', { className: 'ba-cell-primary' }, h(FileType, { ext: d.ext }), h('div', { style: { minWidth: 0 } }, h('div', { className: 'ba-cell-title' }, d.name), d.status === 'processing' ? h('div', { className: 'ba-stack ba-gap-1', style: { marginTop: 6, maxWidth: 260 } }, h(ProgressBar, { value: d.progress, label: 'OCR' }), h('span', { className: 'ba-cell-sub' }, L('ทำ OCR · ', 'OCR · ') + d.note.replace('OCR ', ''))) : d.status === 'failed' ? h('div', { className: 'ba-cell-sub', style: { color: 'var(--danger)' } }, d.error) : h('div', { className: 'ba-cell-sub' }, L('เจ้าของ ', 'Owner ') + d.owner))); } },
              { label: L('แชร์', 'Shared'), render: function (d) { return d.shares.length ? h('div', { className: 'ba-row ba-gap-1 ba-wrap' }, d.shares.map(function (s) { return h('span', { key: s.g, className: 'ba-chip', style: { height: 24 } }, h(Icon, { name: s.p === 'edit' ? 'edit' : 'eye', size: 12 }), s.g); })) : h('span', { className: 'ba-subtle ba-t-small' }, L('เฉพาะฉัน', 'Only me')); } },
              { label: L('ขนาด', 'Size'), className: 'num shrink', key: 'size' },
              { label: L('เวอร์ชัน', 'Ver.'), className: 'shrink', render: function (d) { return 'v' + d.version; } },
              { label: L('อัปเดต', 'Updated'), className: 'shrink', key: 'date' },
              { label: L('สถานะ', 'Status'), className: 'shrink', render: function (d) { return h(StatusBadge, { status: d.status, progress: d.status === 'processing' ? d.progress : null }); } },
              { label: '', className: 'shrink', render: rowMenu }],
            rows: docs.map(function (d) { return Object.assign({ key: d.id }, d); })
          }));
    }
    return h('div', { className: 'ba-content' }, h('div', { className: 'ba-page' }, head, body));
  }

  function FilesScreen(props) {
    var L = useL(), ui = useUI(), app = props.app, v = app.variant;
    if (app.perms['chat.use'] === false) return h('div', { className: 'ba-content' }, h(NoAccess, { perm: 'chat.use', onBack: function () { app.navigate('settings'); } }));
    var fmts = [{ id: 'pdf', t: 'PDF', s: L('เอกสารพร้อมพิมพ์', 'Print-ready document') }, { id: 'docx', t: 'Word .docx', s: L('แก้ไขต่อใน Word', 'Edit further in Word') }, { id: 'html', t: 'HTML', s: L('หน้าเว็บไฟล์เดียว', 'Single-file web page') }, { id: 'png', t: 'PNG', s: L('รูปภาพจากเครื่องมือภาพ', 'Image from the image tool') }];
    var list = app.artifacts;
    return h('div', { className: 'ba-content' }, h('div', { className: 'ba-page' },
      h(PageHead, { title: L('สร้างไฟล์', 'Create files'), sub: L('อธิบายสิ่งที่ต้องการ แล้วเลือกรูปแบบไฟล์ ระบบจะสร้างเบื้องหลัง — ปิดหน้านี้ได้ ไฟล์จะรออยู่ในรายการ', 'Describe what you need and pick a format. Files are generated in the background — you can leave this page.') }),
      h('div', { className: 'ba-card ba-card-pad ba-stack ba-gap-4' },
        h(Field, { label: L('คำอธิบาย (prompt)', 'Prompt'), hint: L('ระบุเนื้อหา โครงสร้าง และผู้อ่าน เช่น “สรุปผลประชุม 1 หน้า สำหรับผู้บริหาร”', 'Describe content, structure and audience') }, h(Textarea, { value: app.filePrompt, onChange: function (e) { app.setFilePrompt(e.target.value); }, placeholder: L('เช่น สร้างภาพปก newsletter โทนสีน้ำเงิน สไตล์ corporate ขนาด 1200×630', 'e.g. A corporate blue newsletter cover, 1200×630'), style: { minHeight: 88 } })),
        h('div', { className: 'ba-field' }, h('span', { className: 'ba-field-label' }, L('รูปแบบไฟล์', 'Format')),
          h('div', { className: 'ba-formats', role: 'radiogroup' }, fmts.map(function (x) {
            return h('button', { key: x.id, type: 'button', role: 'radio', className: 'ba-format', 'aria-checked': app.fileFormat === x.id ? 'true' : 'false', onClick: function () { app.setFileFormat(x.id); } }, h(FileType, { ext: x.id, size: 32 }), h('span', null, h('div', { className: 'ba-format-title' }, x.t), h('div', { className: 'ba-format-sub' }, x.s)));
          }))),
        h('div', { className: 'ba-row ba-gap-3 ba-wrap', style: { justifyContent: 'space-between' } },
          h('div', { className: 'ba-row ba-gap-2' }, h('span', { className: 'ba-t-small ba-muted' }, L('โมเดล', 'Model')), h(Select, { size: 'sm', defaultValue: 'm1', options: app.models.map(function (m) { return { value: m.id, label: m.name }; }), wrapStyle: { minWidth: 180 } })),
          h(Button, { variant: 'primary', icon: 'sparkles', loading: v === 'submitting', onClick: app.createFile, disabled: !app.filePrompt }, L('สร้างไฟล์', 'Create file')))),
      h('div', { className: 'ba-stack ba-gap-3' },
        h('div', { className: 'ba-row', style: { justifyContent: 'space-between' } }, h('h2', { className: 'ba-t-h3' }, L('ไฟล์ที่สร้าง', 'Generated files')), h('span', { className: 'ba-t-small ba-muted' }, L('เก็บตามนโยบายข้อมูลขององค์กร', 'Kept per your organisation’s data policy'))),
        !list.length ? h('div', { className: 'ba-card' }, h(EmptyState, { icon: 'file-plus', title: L('ยังไม่มีไฟล์ที่สร้าง', 'Nothing generated yet') }, L('ไฟล์ที่สร้างจะแสดงที่นี่พร้อมสถานะ และดาวน์โหลดได้เมื่อพร้อม', 'Generated files appear here with their status, ready to download.'))) :
          h('div', { className: 'ba-doclist' }, list.map(function (a) {
            return h('div', { key: a.id, className: 'ba-docrow', style: { alignItems: 'center' } },
              h(FileType, { ext: a.ext }),
              h('div', { className: 'ba-docrow-main' },
                h('div', { className: 'ba-docrow-title' }, a.name),
                h('div', { className: 'ba-docrow-meta' }, h('span', null, a.model), h('span', null, a.date), a.size ? h('span', null, a.size) : null),
                a.status === 'processing' ? h(ProgressBar, { indeterminate: true, label: 'Generating', style: { maxWidth: 320 } }) : null,
                a.status === 'failed' ? h('div', { className: 'ba-t-small', style: { color: 'var(--danger)' } }, a.error) : null),
              h(StatusBadge, { status: a.status }, a.status === 'processing' ? L('กำลังสร้าง…', 'Generating…') : a.status === 'pending' ? L('รอคิว', 'Queued') : null),
              a.status === 'ready' ? h(Button, { size: 'sm', icon: 'download' }, ui.mobile ? null : L('ดาวน์โหลด', 'Download')) : null,
              h(IconButton, { icon: 'trash', label: L('ลบไฟล์', 'Delete file'), onClick: function () { app.openDialog('delete-artifact', a.id); } }));
          })))));
  }

  function OrgTabs(props) {
    var L = useL(), app = props.app;
    var items = [{ value: 'org', label: L('ผู้ใช้และสิทธิ์', 'Users & access'), icon: 'users' }];
    if (app.perms['usage.manage'] !== false) items.push({ value: 'usage', label: 'AI Usage & Limits', icon: 'gauge' });
    return h(Tabs, { items: items, value: app.route, onChange: app.navigate });
  }

  function OrgScreen(props) {
    var L = useL(), ui = useUI(), app = props.app;
    var _f = useState('all'), f = _f[0], setF = _f[1];
    if (app.perms['users.list'] === false) return h('div', { className: 'ba-content' }, h(NoAccess, { perm: 'users.list', onBack: function () { app.navigate('chat'); } }));
    var sub = app.orgSub;
    var users = app.users.filter(function (u) { return f === 'all' || u.status === f; });
    var content;
    if (sub === 'users') content = h('div', { className: 'ba-stack ba-gap-4' },
      h('div', { className: 'ba-row ba-gap-3 ba-wrap', style: { justifyContent: 'space-between' } },
        h('div', { className: 'ba-row ba-gap-3 ba-wrap' }, h('div', { style: { width: 260 } }, h(TextInput, { icon: 'search', size: 'sm', placeholder: L('ค้นหาชื่อหรืออีเมล', 'Search name or email') })),
          h(Segmented, { size: 'sm', value: f, onChange: setF, options: [{ value: 'all', label: L('ทั้งหมด', 'All') }, { value: 'active', label: L('ใช้งาน', 'Active') }, { value: 'pending-account', label: L('รออนุมัติ', 'Pending') + ' 1' }, { value: 'suspended', label: L('ระงับ', 'Suspended') }] })),
        h(Button, { variant: 'primary', icon: 'user-plus', onClick: function () { app.openDialog('create-user'); } }, L('สร้างผู้ใช้', 'Create user'))),
      h(DataTable, {
        columns: [
          { label: L('ผู้ใช้', 'User'), render: function (u) { return h('div', { className: 'ba-cell-primary' }, h(Avatar, { name: u.name, size: 32 }), h('div', null, h('div', { className: 'ba-cell-title' }, u.name), h('div', { className: 'ba-cell-sub' }, u.email))); } },
          { label: L('กลุ่ม', 'Groups'), render: function (u) { return h('div', { className: 'ba-row ba-gap-1 ba-wrap' }, u.groups.map(function (g) { return h('span', { key: g, className: 'ba-chip', style: { height: 24 } }, g); })); } },
          { label: L('สถานะ', 'Status'), className: 'shrink', render: function (u) { return h(StatusBadge, { status: u.status }); } },
          { label: L('ใช้งานล่าสุด', 'Last active'), className: 'shrink', key: 'last' },
          { label: '', className: 'shrink', render: function (u) { return u.status === 'pending-account' ? h('div', { className: 'ba-row ba-gap-2' }, h(Button, { size: 'sm', variant: 'primary', icon: 'check', onClick: function () { app.setUserStatus(u.id, 'active'); } }, L('อนุมัติ', 'Approve'))) : u.status === 'suspended' ? h(Button, { size: 'sm', onClick: function () { app.setUserStatus(u.id, 'active'); } }, L('เปิดใช้งาน', 'Reactivate')) : u.id === 'u1' ? h('span', { className: 'ba-t-small ba-subtle' }, L('คุณ', 'You')) : h(Button, { size: 'sm', variant: 'danger-ghost', onClick: function () { app.openDialog('suspend', u.id); } }, L('ระงับ', 'Suspend')); } }],
        rows: users.map(function (u) { return Object.assign({ key: u.id }, u); })
      }));
    if (sub === 'groups') content = h('div', { className: 'ba-stack ba-gap-4' },
      h('div', { className: 'ba-row', style: { justifyContent: 'space-between' } }, h('div', { className: 'ba-muted ba-t-small' }, L('สิทธิ์มีผลเฉพาะผู้ใช้สถานะ “ใช้งานอยู่”', 'Permissions only apply to Active users')), h(Button, { icon: 'plus' }, L('สร้างกลุ่ม', 'New group'))),
      h(DataTable, {
        columns: [{ label: L('สิทธิ์', 'Permission'), render: function (p) { return h('div', null, h('div', { className: 'ba-cell-title' }, L(p[1], p[2])), h('code', { className: 'ba-cell-sub ba-mono' }, p[0])); } }].concat(app.groups.map(function (g) {
          return { label: h('span', { className: 'ba-stack', style: { alignItems: 'center' } }, g.name, h('span', { style: { fontWeight: 400 } }, g.members + L(' คน', ' members'))), className: 'shrink', render: function (p) { var on = g.perms.indexOf(p[0]) >= 0; return h('div', { style: { display: 'flex', justifyContent: 'center' } }, h(Checkbox, { checked: on, onChange: function () { app.togglePerm(g.id, p[0]); } })); } };
        })),
        rows: DATA.perms.map(function (p) { return Object.assign([].concat(p), { key: p[0] }); })
      }),
      h('div', { className: 'ba-row ba-gap-2', style: { justifyContent: 'flex-end' } }, h(Button, { variant: 'ghost' }, L('ยกเลิก', 'Cancel')), h(Button, { variant: 'primary', onClick: function () { app.toast('success', L('บันทึกสิทธิ์ของกลุ่มแล้ว', 'Group permissions saved'), L('มีผลกับสมาชิกทุกคนทันที', 'Applies to all members immediately')); app.emit('group-saved'); } }, L('บันทึกการเปลี่ยนแปลง', 'Save changes'))));
    if (sub === 'models') content = h(DataTable, {
      columns: [
        { label: L('โมเดล', 'Model'), render: function (m) { return h('div', null, h('div', { className: 'ba-cell-title' }, m.name), h('div', { className: 'ba-cell-sub' }, m.hint)); } },
        { label: L('เปิดใช้', 'Enabled'), className: 'shrink', render: function (m) { return h(Switch, { checked: m.enabled, label: null }); } },
        { label: L('กลุ่มที่ได้รับสิทธิ์', 'Granted to'), render: function (m) { return m.groups.length ? h('div', { className: 'ba-row ba-gap-1 ba-wrap' }, m.groups.map(function (g) { return h('span', { key: g, className: 'ba-chip', style: { height: 24 } }, g); }), h(IconButton, { icon: 'plus', size: 'sm', label: L('เพิ่มกลุ่ม', 'Add group') })) : h('span', { className: 'ba-subtle ba-t-small' }, '—'); } },
        { label: L('ค่าเริ่มต้น', 'Default'), className: 'shrink', render: function (m) { return h('input', { type: 'radio', name: 'def', defaultChecked: m.isDefault, disabled: !m.enabled, style: { accentColor: 'var(--brand-strong)', width: 18, height: 18 } }); } },
        { label: 'Fallback', className: 'shrink', render: function (m) { return h('input', { type: 'radio', name: 'fb', defaultChecked: m.fallback, disabled: !m.enabled, style: { accentColor: 'var(--brand-strong)', width: 18, height: 18 } }); } }],
      rows: app.models.map(function (m) { return Object.assign({ key: m.id }, m); })
    });
    if (sub === 'audit') content = h('div', { className: 'ba-stack ba-gap-4' },
      h('div', { className: 'ba-row ba-gap-3 ba-wrap' }, h('div', { style: { width: 240 } }, h(TextInput, { icon: 'search', size: 'sm', placeholder: L('ค้นหาผู้ใช้หรือรายการ', 'Search user or target') })),
        h(Select, { size: 'sm', options: [L('ทุกการกระทำ', 'All actions'), 'auth.*', 'document.*', 'user.*', 'model.*', 'retention.*'], wrapStyle: { width: 180 } }),
        h(Select, { size: 'sm', options: [L('7 วันล่าสุด', 'Last 7 days'), L('30 วันล่าสุด', 'Last 30 days'), L('กำหนดเอง', 'Custom range')], wrapStyle: { width: 160 } }),
        h('span', { className: 'ba-grow' }), h(Button, { icon: 'download', size: 'sm' }, L('ส่งออก CSV', 'Export CSV'))),
      h(DataTable, {
        columns: [{ label: L('เวลา', 'Time'), key: 't', className: 'shrink' }, { label: L('ผู้ทำ', 'Actor'), key: 'who', className: 'shrink' }, { label: L('การกระทำ', 'Action'), className: 'shrink', render: function (r) { return h('code', { className: 'ba-mono ba-t-small' }, r.act); } }, { label: L('รายการ', 'Target'), key: 'target' }, { label: 'IP', className: 'shrink', render: function (r) { return h('span', { className: 'ba-mono ba-t-small ba-muted' }, r.ip); } }],
        rows: DATA.audit
      }));
    if (sub === 'data') content = h('div', { className: 'ba-stack ba-gap-4' },
      h('div', { className: 'ba-card' },
        h('div', { className: 'ba-card-head' }, h('div', { className: 'ba-card-head-text' }, h('div', { className: 'ba-t-h4' }, L('ระยะเวลาเก็บรักษาข้อมูล (Retention)', 'Data retention')), h('div', { className: 'ba-t-small ba-muted' }, L('ระบบลบข้อมูลที่หมดอายุทุกวันเวลา 02:00 และบันทึกลง Audit log', 'Expired data is deleted daily at 02:00 and recorded in the audit log')))),
        h('div', { className: 'ba-card-pad', style: { display: 'grid', gridTemplateColumns: ui.mobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 } },
          h(Field, { label: L('ประวัติแชต', 'Chat history') }, h(Select, { defaultValue: '180', options: [{ value: '30', label: L('30 วัน', '30 days') }, { value: '90', label: L('90 วัน', '90 days') }, { value: '180', label: L('180 วัน', '180 days') }, { value: '0', label: L('ไม่ลบอัตโนมัติ', 'Keep forever') }] })),
          h(Field, { label: L('ไฟล์แนบในแชต', 'Chat attachments') }, h(Select, { defaultValue: '30', options: [{ value: '7', label: L('7 วัน', '7 days') }, { value: '30', label: L('30 วัน', '30 days') }, { value: '90', label: L('90 วัน', '90 days') }] })),
          h(Field, { label: L('ไฟล์ที่สร้าง (Create files)', 'Generated files') }, h(Select, { defaultValue: '90', options: [{ value: '30', label: L('30 วัน', '30 days') }, { value: '90', label: L('90 วัน', '90 days') }, { value: '365', label: L('1 ปี', '1 year') }] }))),
        h('div', { className: 'ba-dialog-foot', style: { borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' } }, h(Button, { variant: 'primary', onClick: function () { app.toast('success', L('บันทึกนโยบายแล้ว', 'Policy saved')); } }, L('บันทึกนโยบาย', 'Save policy')))),
      h('div', { className: 'ba-card ba-card-pad ba-row ba-gap-4 ba-wrap' }, h('div', { className: 'ba-grow', style: { minWidth: 240 } }, h('div', { className: 'ba-t-h4' }, L('ล้างข้อมูลที่หมดอายุตอนนี้', 'Run cleanup now')), h('div', { className: 'ba-t-small ba-muted' }, L('ลบไฟล์และ metadata ที่เกินระยะเวลาตามนโยบายทันที ไม่สามารถกู้คืนได้', 'Permanently deletes files and metadata past their retention period'))), h(Button, { variant: 'danger-ghost', icon: 'trash', onClick: function () { app.openDialog('cleanup'); } }, L('สั่ง Cleanup', 'Run cleanup'))),
      h('div', { className: 'ba-card ba-card-pad ba-row ba-gap-4 ba-wrap' }, h('div', { className: 'ba-grow', style: { minWidth: 240 } }, h('div', { className: 'ba-t-h4' }, L('ดาวน์โหลดข้อมูลองค์กร', 'Export organisation data')), h('div', { className: 'ba-t-small ba-muted' }, L('ไฟล์ ZIP ของผู้ใช้ กลุ่ม แชต เอกสาร และ Audit log', 'ZIP of users, groups, chats, documents and audit log'))), h(Button, { icon: 'archive' }, L('ส่งออก ZIP', 'Export ZIP'))));
    return h('div', { className: 'ba-content' }, h('div', { className: 'ba-page' },
      h(PageHead, { title: L('องค์กร', 'Organization'), sub: DATA.org }),
      h(OrgTabs, { app: app }),
      h('div', { style: { overflowX: 'auto' } }, h(Segmented, { value: sub, onChange: function (s) { app.setOrgSub(s); if (s === 'groups') app.emit('groups'); }, options: [{ value: 'users', label: L('ผู้ใช้', 'Users'), icon: 'user' }, { value: 'groups', label: L('กลุ่มและสิทธิ์', 'Groups & permissions'), icon: 'users' }, { value: 'models', label: L('โมเดล', 'Models'), icon: 'sparkles' }, { value: 'audit', label: 'Audit log', icon: 'history' }, { value: 'data', label: L('นโยบายข้อมูล', 'Data policy'), icon: 'shield' }] })),
      content));
  }

  function UsageScreen(props) {
    var L = useL(), ui = useUI(), app = props.app; var near = app.variant === 'near-limit';
    if (app.perms['usage.manage'] === false) return h('div', { className: 'ba-content' }, h(NoAccess, { perm: 'usage.manage', onBack: function () { app.navigate('chat'); } }));
    var used = near ? 18640 : 12480, limit = 20000, max = Math.max.apply(null, DATA.usageDays);
    return h('div', { className: 'ba-content' }, h('div', { className: 'ba-page' },
      h(PageHead, { title: L('องค์กร', 'Organization'), sub: DATA.org }),
      h(OrgTabs, { app: app }),
      near ? h(Alert, { tone: 'warning', title: L('ใช้โควตาองค์กรไปแล้ว 93%', 'Organisation quota 93% used'), action: h(Button, { size: 'sm' }, L('ปรับโควตา', 'Adjust quota')) }, L('เมื่อครบ 20,000 คำขอ ผู้ใช้จะส่งข้อความใหม่ไม่ได้จนถึงรอบเดือนถัดไป (1 พ.ย.)', 'At 20,000 requests users can’t send new messages until the next cycle (1 Nov).')) : null,
      h('div', { className: 'ba-stats' },
        h(StatTile, { label: L('คำขอเดือนนี้', 'Requests this month'), value: used.toLocaleString('en-US'), sub: L('จากโควตา 20,000 · รีเซ็ต 1 พ.ย.', 'of 20,000 · resets 1 Nov') }, h(ProgressBar, { value: used / limit * 100, tone: near ? 'warning' : null })),
        h(StatTile, { label: L('ผู้ใช้ที่ใช้งาน', 'Active users'), value: '96', sub: L('จาก 128 บัญชี', 'of 128 accounts') }),
        h(StatTile, { label: 'Tokens', value: '18.4M', sub: L('input 14.1M · output 4.3M', 'input 14.1M · output 4.3M') }),
        h(StatTile, { label: L('ค้นเว็บ', 'Web searches'), value: '1,302', sub: L('10% ของคำขอ', '10% of requests') })),
      h('div', { className: 'ba-card ba-card-pad ba-stack ba-gap-3' }, h('div', { className: 'ba-row', style: { justifyContent: 'space-between' } }, h('div', { className: 'ba-t-h4' }, L('คำขอรายวัน — ตุลาคม 2026', 'Daily requests — October 2026')), h('span', { className: 'ba-t-small ba-muted' }, L('แท่งสีอ่อน = วันหยุด', 'Light bars = weekends'))),
        h('div', { className: 'ba-bars', role: 'img', 'aria-label': 'Daily requests chart' }, DATA.usageDays.map(function (d, i) { return h('div', { key: i, className: d < 200 ? 'is-low' : '', style: { height: (d / max * 100) + '%' }, title: (i + 1) + ' Oct: ' + d }); }))),
      h('div', { className: 'ba-stack ba-gap-3' }, h('div', { className: 'ba-row', style: { justifyContent: 'space-between' } }, h('h2', { className: 'ba-t-h3' }, L('โควตารายบุคคล', 'Per-user limits')), h(Button, { size: 'sm', icon: 'edit' }, L('ตั้งค่าเริ่มต้นรายคน', 'Default per-user limit'))),
        h(DataTable, {
          columns: [{ label: L('ผู้ใช้', 'User'), render: function (u) { return h('div', { className: 'ba-cell-primary' }, h(Avatar, { name: u.name, size: 28 }), h('div', null, h('div', { className: 'ba-cell-title' }, u.name), h('div', { className: 'ba-cell-sub' }, u.group))); } },
          { label: L('ใช้ไปเดือนนี้', 'Used this month'), render: function (u) { return h(UsageMeter, { used: u.used, limit: u.limit, style: { maxWidth: 260 } }); } },
          { label: L('โควตา/เดือน', 'Limit / month'), className: 'shrink', render: function (u) { return h('div', { style: { width: 120 } }, h(TextInput, { size: 'sm', defaultValue: u.limit ? u.limit : '', placeholder: L('ไม่จำกัด', 'Unlimited'), style: { textAlign: 'right' } })); } }],
          rows: DATA.usageUsers
        }))));
  }

  function SettingsScreen(props) {
    var L = useL(), ui = useUI(), app = props.app, v = app.variant;
    var _sec = useState(v === 'forced-password' || v === 'password-error' ? 'password' : 'personal'), sec = _sec[0], setSec = _sec[1];
    var _style = useState('balanced'), st = _style[0], setSt = _style[1];
    var _ext = useState({ PDF: 1, 'JPG/JPEG': 1, PNG: 1, WEBP: 1, DOC: 0, DOCX: 1, XLSX: 1, PPTX: 0, TXT: 1, MD: 1, CSV: 1, JSON: 1, HTML: 0 }), ext = _ext[0], setExt = _ext[1];
    var row = function (title, desc, control) { return h('div', { className: 'ba-setrow' }, h('div', null, h('div', { className: 'ba-t-h4' }, title), desc ? h('div', { className: 'ba-t-small ba-muted', style: { marginTop: 4 } }, desc) : null), h('div', null, control)); };
    var forced = v === 'forced-password';
    return h('div', { className: 'ba-content' }, h('div', { className: 'ba-page' },
      h(PageHead, { title: L('ตั้งค่า', 'Settings'), sub: app.user.email }),
      forced ? h(Alert, { tone: 'warning', title: L('ต้องเปลี่ยนรหัสผ่านก่อนใช้งาน', 'Change your password to continue') }, L('ผู้ดูแลสร้างบัญชีด้วยรหัสผ่านชั่วคราว ตั้งรหัสผ่านใหม่เพื่อเริ่มใช้แชตและ Knowledge', 'Your account uses a temporary password. Set a new one to unlock chat and Knowledge.')) : null,
      h('div', { className: 'ba-settings' },
        h('nav', { className: 'ba-settings-nav' }, [['personal', 'sparkles', L('การตอบของ AI', 'AI responses')], ['password', 'key', L('รหัสผ่าน', 'Password')], ['language', 'globe', L('ภาษา', 'Language')], ['display', 'type', L('การแสดงผล', 'Display')], ['uploads', 'paperclip', L('ไฟล์แนบในแชต', 'Chat uploads')]].map(function (s) {
          return h('button', { key: s[0], type: 'button', className: 'ba-navitem', style: { color: 'var(--ink)' }, 'aria-current': sec === s[0] ? 'true' : undefined, onClick: function () { setSec(s[0]); } }, h(Icon, { name: s[1], size: 17, style: { color: sec === s[0] ? 'var(--brand-strong)' : 'var(--ink-muted)' } }), h('span', { style: { fontWeight: sec === s[0] ? 600 : 500 } }, s[2]));
        })),
        h('div', { className: 'ba-card ba-card-pad' },
          (forced || sec === 'password') ? h(Fragment, null,
            row(L('เปลี่ยนรหัสผ่าน', 'Change password'), L('อย่างน้อย 10 ตัวอักษร', 'At least 10 characters'), h('div', { className: 'ba-stack ba-gap-3' },
              h(Field, { label: L('รหัสผ่านปัจจุบัน', 'Current password'), error: v === 'password-error' ? L('รหัสผ่านปัจจุบันไม่ถูกต้อง', 'Current password is incorrect') : null }, h(TextInput, { type: 'password', defaultValue: v === 'password-error' ? 'wrongpass12' : '', invalid: v === 'password-error' })),
              h(Field, { label: L('รหัสผ่านใหม่', 'New password') }, h(TextInput, { type: 'password' })),
              h(Field, { label: L('ยืนยันรหัสผ่านใหม่', 'Confirm new password') }, h(TextInput, { type: 'password' })),
              h('div', null, h(Button, { variant: 'primary', onClick: function () { app.toast('success', L('เปลี่ยนรหัสผ่านแล้ว', 'Password changed')); } }, L('เปลี่ยนรหัสผ่าน', 'Change password'))))))
            : sec === 'personal' ? h(Fragment, null,
              row(L('รูปแบบคำตอบ', 'Response style'), L('ใช้กับทุกแชตใหม่ เก็บในบัญชีของคุณ', 'Applies to new chats; saved to your account'), h(Segmented, { value: st, onChange: setSt, block: ui.mobile, options: [{ value: 'balanced', label: L('สมดุล', 'Balanced') }, { value: 'concise', label: L('กระชับ', 'Concise') }, { value: 'detailed', label: L('ละเอียด', 'Detailed') }] })),
              row(L('คำสั่งเพิ่มเติม (Custom instructions)', 'Custom instructions'), L('บอกบริบทงานหรือรูปแบบที่ต้องการให้ AI ใช้เสมอ', 'Context or format the AI should always follow'), h('div', { className: 'ba-stack ba-gap-2' }, h(Textarea, { defaultValue: 'ฉันทำงานฝ่าย HR ตอบเป็นภาษาไทยแบบทางการ และสรุปเป็นข้อ ๆ ก่อนเสมอ', maxLength: 1500 }), h('span', { className: 'ba-t-small ba-muted', style: { textAlign: 'right' } }, '62 / 1,500'))),
              h('div', { className: 'ba-row ba-gap-2', style: { justifyContent: 'flex-end', paddingTop: 8 } }, v === 'saved' ? h('span', { className: 'ba-row ba-gap-1 ba-t-small', style: { color: 'var(--success)' } }, h(Icon, { name: 'check-circle', size: 15 }), L('บันทึกแล้ว', 'Saved')) : null, h(Button, { variant: 'primary', onClick: function () { app.toast('success', L('บันทึกการตั้งค่าแล้ว', 'Settings saved')); } }, L('บันทึก', 'Save'))))
              : sec === 'language' ? h(Fragment, null,
                row(L('ภาษาเมนูด้านซ้าย', 'Sidebar menu language'), L('ค่าเริ่มต้น English · เก็บในเบราว์เซอร์นี้', 'Default English · stored in this browser'), h(Segmented, { value: ui.navLang, onChange: function (x) { app.setUI({ navLang: x }); }, options: [{ value: 'en', label: 'English' }, { value: 'th', label: 'ไทย' }] })),
                row(L('ภาษาเนื้อหา', 'Content language'), L('ค่าเริ่มต้น ไทย · เปลี่ยนแยกจากเมนูได้', 'Default Thai · independent of the menu'), h(Segmented, { value: ui.lang, onChange: function (x) { app.setUI({ lang: x }); }, options: [{ value: 'th', label: 'ไทย' }, { value: 'en', label: 'English' }] })))
                : sec === 'display' ? h(Fragment, null,
                  row(L('ขนาดตัวอักษร', 'Font size'), L('เพิ่มจากขนาดฐาน 0–4 pt · ค่าเริ่มต้น +1 pt', 'Adds 0–4 pt to the base size · default +1 pt'), h('div', { className: 'ba-stack ba-gap-2' }, h('input', { type: 'range', className: 'ba-range', min: 0, max: 4, step: 1, value: app.fontAdjust, onChange: function (e) { app.setUI({ fontAdjust: +e.target.value }); }, 'aria-label': 'Font size' }), h('div', { className: 'ba-fontscale' }, ['+0', '+1', '+2', '+3', '+4'].map(function (x) { return h('span', { key: x }, x + ' pt'); })), h('div', { className: 'ba-source-pop', style: { fontSize: 'var(--ba-fs-body-lg)' } }, L('ตัวอย่าง: พนักงานที่มีอายุงานครบ 3 ปีมีสิทธิ์ลา 12 วันทำการ', 'Preview: employees with 3+ years get 12 working days.')))),
                  row(L('ธีม', 'Theme'), L('เก็บในเบราว์เซอร์นี้', 'Stored in this browser'), h(Segmented, { value: app.theme, onChange: function (x) { app.setUI({ theme: x }); }, options: [{ value: 'light', label: L('สว่าง', 'Light'), icon: 'sun' }, { value: 'dark', label: L('มืด', 'Dark'), icon: 'moon' }] })))
                  : h(Fragment, null,
                    row(L('นามสกุลไฟล์ที่อนุญาตในแชต', 'Allowed chat upload types'), L('ไฟล์แนบในแชตไม่เกิน 5 MB · เก็บในบัญชีของคุณ', 'Chat attachments up to 5 MB · saved to your account'), h('div', { className: 'ba-extgrid' }, Object.keys(ext).map(function (k) { return h(Checkbox, { key: k, label: k, checked: !!ext[k], onChange: function (on) { var n = Object.assign({}, ext); n[k] = on ? 1 : 0; setExt(n); } }); }))),
                    h('div', { className: 'ba-row', style: { justifyContent: 'flex-end', paddingTop: 8 } }, h(Button, { variant: 'primary', onClick: function () { app.toast('success', L('บันทึกชนิดไฟล์แล้ว', 'Upload types saved')); } }, L('บันทึก', 'Save'))))))));
  }

  /* ---------------- the interactive app (screens + prototype share it) ---------------- */
  function initialState(p) {
    var route = p.route || 'login', v = p.variant || 'default', role = p.role || 'admin';
    var st = {
      route: route, variant: v, role: role,
      chats: clone(DATA.chats), currentChat: null, menuChat: null, renameChat: null,
      thread: [], openSource: null, streaming: false,
      composer: { text: '', attachments: [], web: false, model: 'm1', kbMode: 'none', kbDoc: null, menu: null },
      docs: clone(DATA.docs), docMenu: null, artifacts: clone(DATA.artifacts), users: clone(DATA.users), groups: clone(DATA.groups),
      filePrompt: '', fileFormat: 'pdf', orgSub: 'users', dialog: null, dialogTarget: null, toasts: [], newUser: null
    };
    if (p.docs === 'prototype') st.docs = st.docs.filter(function (d) { return d.id !== 'd1'; });
    if (route === 'knowledge' && v === 'empty') st.docs = [];
    if (route === 'files' && v === 'empty') st.artifacts = [];
    if (route === 'files' && v === 'generating') { st.filePrompt = 'สร้างภาพปก newsletter ปลายปี โทนน้ำเงิน corporate ขนาด 1200×630'; st.fileFormat = 'png'; st.variant = 'submitting'; }
    if (route === 'chat') {
      var c = st.composer;
      if (v === 'plus-menu') c.menu = 'plus';
      if (v === 'library') c.menu = 'library';
      if (v === 'attach-reading') { c.text = 'ช่วยสรุปไฟล์นี้เป็น 5 ข้อ'; c.attachments = [{ id: 'f1', name: 'งบประมาณการตลาด_2027.xlsx', status: 'reading' }]; }
      if (v === 'attach-ready') { c.text = 'ช่วยสรุปไฟล์นี้เป็น 5 ข้อ'; c.attachments = [{ id: 'f1', name: 'งบประมาณการตลาด_2027.xlsx', status: 'ready', meta: '1.2 MB · XLSX' }]; }
      if (v === 'attach-failed') { c.attachments = [{ id: 'f1', name: 'วิดีโอแนะนำสินค้า.mp4', status: 'failed', error: 'ชนิดไฟล์ .mp4 ไม่ได้เปิดใช้ใน Settings' }]; }
      if (v === 'attach-too-big') { c.attachments = [{ id: 'f1', name: 'รายงานประจำปี_2025.pdf', status: 'failed', error: 'ไฟล์ 12.4 MB เกินขนาด 5 MB' }]; }
      if (v === 'knowledge-doc') { c.kbMode = 'one'; c.kbDoc = 'd1'; c.attachments = [{ id: 'kb', kind: 'knowledge', name: 'นโยบายลาพักร้อน 2026.pdf', meta: 'v3' }]; c.text = ANSWER.th.q; }
      if (v === 'web') { c.web = true; c.text = WEB.q.th; }
      if (v === 'no-permission') st.noChat = true;
    }
    if (route === 'thread') {
      st.currentChat = 'c1';
      var lang = p.lang === 'en' ? 'en' : 'th';
      var a = ANSWER[lang];
      st.thread = [{ role: 'user', text: a.q, files: [{ kind: 'knowledge', name: 'นโยบายลาพักร้อน 2026.pdf', meta: 'v3' }] }, { role: 'assistant', paras: a.paras, sources: SOURCES_DOC, meta: 'GPT-5.1 · 09:16' }];
      if (v === 'streaming') { st.thread[1].streaming = true; st.thread[1].revealed = 46; st.streaming = true; st.composer.text = ''; }
      if (v === 'source-open') st.openSource = 1;
      if (v === 'web') { st.thread = st.thread.concat([{ role: 'user', text: WEB.q[lang] }, { role: 'assistant', paras: WEB.paras[lang], sources: WEB.sources, meta: 'GPT-5.1 · ' + (lang === 'en' ? 'Web search' : 'ค้นเว็บ') + ' · 09:20' }]); st.composer.web = true; }
      if (v === 'error') st.thread = st.thread.concat([{ role: 'user', text: lang === 'en' ? 'Draft an announcement email from this policy' : 'ช่วยร่างอีเมลประกาศนโยบายนี้ให้พนักงาน' }, { role: 'assistant', paras: [], error: { title: lang === 'en' ? 'Couldn’t finish the answer' : 'ตอบไม่สำเร็จ', body: lang === 'en' ? 'The connection to the model was interrupted. Your message is saved — try again.' : 'การเชื่อมต่อกับโมเดลขัดข้องระหว่างตอบ ข้อความของคุณถูกบันทึกไว้แล้ว ลองส่งอีกครั้ง' } }]);
      if (v === 'quota') st.thread = st.thread.concat([{ role: 'user', text: lang === 'en' ? 'Summarise it in English' : 'สรุปเป็นภาษาอังกฤษให้หน่อย' }, { role: 'assistant', paras: [], error: { title: lang === 'en' ? 'Monthly limit reached' : 'ใช้โควตาเดือนนี้ครบแล้ว', body: lang === 'en' ? 'You’ve used 1,500 of 1,500 requests. It resets on 1 Nov, or ask an administrator to raise your limit.' : 'คุณใช้ครบ 1,500 / 1,500 คำขอ โควตาจะรีเซ็ต 1 พ.ย. หรือติดต่อผู้ดูแลเพื่อขอเพิ่ม' } }]);
    }
    if (route === 'knowledge') {
      if (v === 'share') { st.dialog = 'share'; st.dialogTarget = 'd1'; }
      if (v === 'versions') { st.dialog = 'versions'; st.dialogTarget = 'd1'; }
      if (v === 'delete') { st.dialog = 'delete-doc'; st.dialogTarget = 'd4'; }
      if (v === 'uploading') { st.docs.unshift({ id: 'dn', name: 'คู่มือสวัสดิการ 2026.pdf', ext: 'pdf', size: '8.1 MB', version: 1, date: 'เมื่อสักครู่', status: 'processing', progress: 12, note: 'OCR หน้า 3/24', owner: 'ศิริพร ว.', shares: [] }); }
    }
    if (route === 'org') {
      var map = { 'create-user': ['users', 'create-user'], 'temp-password': ['users', 'temp-password'], groups: ['groups'], models: ['models'], audit: ['audit'], 'data-policy': ['data'], 'cleanup-confirm': ['data', 'cleanup'], suspend: ['users', 'suspend'] };
      var m = map[v]; if (m) { st.orgSub = m[0]; if (m[1]) st.dialog = m[1]; }
      if (v === 'temp-password') st.newUser = { email: 'kanokwan@siamdemo.co.th', name: 'กนกวรรณ ใจดี', pw: 'Tmp-9fK2-qX7m-41aZ' };
      if (v === 'suspend') st.dialogTarget = 'u3';
    }
    if (route === 'settings' && v === 'saved') st.toasts = [{ id: 1, tone: 'success', title: 'บันทึกการตั้งค่าแล้ว', body: 'มีผลกับแชตใหม่ทั้งหมด' }];
    if (v === 'toast-error') st.toasts = [{ id: 1, tone: 'danger', title: 'ลบเอกสารไม่สำเร็จ', body: 'คุณมีสิทธิ์ดูอย่างเดียวสำหรับเอกสารนี้' }];
    return st;
  }

  function BenterApp(props) {
    var ui = useUI(), L = useL();
    var _s = useState(function () { return initialState(Object.assign({}, props, { lang: ui.lang })); }), s = _s[0], setS = _s[1];
    var ref = useRef(s); ref.current = s;
    var set = function (patch) { setS(function (prev) { return Object.assign({}, prev, typeof patch === 'function' ? patch(prev) : patch); }); };
    var emit = function (e) { props.onEvent && props.onEvent(e); };
    var timers = useRef([]);
    useEffect(function () { return function () { timers.current.forEach(clearInterval); }; }, []);
    var role = s.role;
    var perms = {};
    DATA.perms.forEach(function (p) { perms[p[0]] = role === 'admin'; });
    perms['chat.use'] = true; perms['documents.use'] = true;
    if (role !== 'admin') { perms['users.list'] = false; perms['usage.manage'] = false; }
    if (s.noChat) perms['chat.use'] = false;
    if (s.route === 'knowledge' && s.variant === 'no-permission') perms['documents.use'] = false;
    var user = role === 'admin' ? DATA.admin : DATA.member;

    function toast(tone, title, body) { var id = Date.now() + Math.random(); set(function (p) { return { toasts: p.toasts.concat([{ id: id, tone: tone, title: title, body: body }]) }; }); var t = setTimeout(function () { set(function (p) { return { toasts: p.toasts.filter(function (x) { return x.id !== id; }) }; }); }, 3800); timers.current.push(t); }
    function navigate(r) {
      if (r === 'chat') { set({ route: 'chat', variant: 'default', currentChat: null, thread: [], openSource: null, menuChat: null, docMenu: null, dialog: null }); emit('nav:chat'); return; }
      set({ route: r, variant: 'default', menuChat: null, docMenu: null, dialog: null }); emit('nav:' + r);
    }
    function setComposer(patch) { set(function (p) { return { composer: Object.assign({}, p.composer, patch) }; }); }
    function onPick(kind) {
      var c = ref.current.composer;
      if (kind === 'web') { setComposer({ web: !c.web, menu: null }); return; }
      if (kind === 'library') { setComposer({ menu: 'library' }); return; }
      if (kind === 'image') { set({ route: 'files', variant: 'default', filePrompt: c.text, fileFormat: 'png' }); return; }
      if (kind === 'file') {
        setComposer({ menu: null, attachments: c.attachments.filter(function (a) { return a.kind === 'knowledge'; }).concat([{ id: 'f' + Date.now(), name: 'สรุปยอดขาย_ต.ค.pdf', status: 'uploading', progress: 35 }]) });
        var t1 = setTimeout(function () { set(function (p) { return { composer: Object.assign({}, p.composer, { attachments: p.composer.attachments.map(function (a) { return a.status === 'uploading' ? Object.assign({}, a, { status: 'reading' }) : a; }) }) }; }); }, 700);
        var t2 = setTimeout(function () { set(function (p) { return { composer: Object.assign({}, p.composer, { attachments: p.composer.attachments.map(function (a) { return a.status === 'reading' ? Object.assign({}, a, { status: 'ready', meta: '640 KB · PDF' }) : a; }) }) }; }); }, 1900);
        timers.current.push(t1, t2);
      }
    }
    function onPickDoc(d) {
      var c = ref.current.composer;
      setComposer({ menu: null, kbMode: 'one', kbDoc: d.id, text: c.text || (d.id === 'd1' ? ANSWER[ui.lang === 'en' ? 'en' : 'th'].q : ''), attachments: c.attachments.filter(function (a) { return a.kind !== 'knowledge'; }).concat([{ id: 'kb', kind: 'knowledge', name: d.name, meta: 'v' + d.version }]) });
      emit('kb-select');
    }
    function removeAttachment(id) { var c = ref.current.composer; setComposer({ attachments: c.attachments.filter(function (a) { return a.id !== id; }), kbDoc: id === 'kb' ? null : c.kbDoc, kbMode: id === 'kb' ? 'none' : c.kbMode }); }
    function stream(paras, sources, metaLabel) {
      var total = segLen(paras), n = 0;
      var iv = setInterval(function () {
        n += 4;
        set(function (p) {
          var th = p.thread.slice(); var last = Object.assign({}, th[th.length - 1]);
          if (n >= total) { last.streaming = false; last.revealed = null; th[th.length - 1] = last; clearInterval(iv); setTimeout(function () { emit('answered'); }, 0); return { thread: th, streaming: false }; }
          last.revealed = n; th[th.length - 1] = last; return { thread: th };
        });
      }, 45);
      timers.current.push(iv);
    }
    function send() {
      var c = ref.current.composer; if (!c.text) return;
      var lang = ui.lang === 'en' ? 'en' : 'th';
      var useWeb = c.web, useKb = c.kbMode !== 'none';
      var paras = useWeb ? WEB.paras[lang] : useKb ? ANSWER[lang].paras : [[lang === 'en' ? 'Here is a structured first draft. Tell me the audience and tone, and I’ll refine it.' : 'นี่คือร่างแรกแบบมีโครงสร้าง บอกกลุ่มผู้อ่านและโทนที่ต้องการ แล้วผมจะปรับให้ตรงยิ่งขึ้น']];
      var sources = useWeb ? WEB.sources : useKb ? SOURCES_DOC : [];
      var files = c.attachments.map(function (a) { return { kind: a.kind, name: a.name, meta: a.meta, status: 'ready' }; });
      var newChat = !ref.current.currentChat;
      set(function (p) {
        return {
          route: 'thread', variant: 'default', currentChat: p.currentChat || 'cn', openSource: null, streaming: true,
          chats: newChat ? [{ id: 'cn', title: c.text.slice(0, 42), when: 'today' }].concat(p.chats) : p.chats,
          thread: p.thread.concat([{ role: 'user', text: c.text, files: files }, { role: 'assistant', paras: paras, sources: sources, streaming: true, revealed: 0, meta: 'GPT-5.1 · ' + (useWeb ? (lang === 'en' ? 'Web search · ' : 'ค้นเว็บ · ') : '') + '09:24' }]),
          composer: Object.assign({}, p.composer, { text: '', attachments: [], menu: null })
        };
      });
      emit('send');
      var t = setTimeout(function () { stream(paras, sources); }, 900); timers.current.push(t);
    }
    function stop() { timers.current.forEach(clearInterval); set(function (p) { var th = p.thread.slice(); var last = Object.assign({}, th[th.length - 1], { streaming: false, revealed: null, meta: L('หยุดตอบแล้ว · GPT-5.1', 'Stopped · GPT-5.1') }); th[th.length - 1] = last; return { thread: th, streaming: false }; }); }
    function retry() { set(function (p) { var th = p.thread.slice(0, -1); var lang = ui.lang === 'en' ? 'en' : 'th'; th.push({ role: 'assistant', paras: [[lang === 'en' ? 'Subject: Updated 2026 vacation policy — what changes for you' : 'เรื่อง: แจ้งนโยบายลาพักร้อนปี 2026 — สิ่งที่เปลี่ยนแปลงสำหรับพนักงาน']], sources: [], streaming: true, revealed: 0, meta: 'GPT-5.1 · 09:30' }); return { thread: th, streaming: true }; }); var t = setTimeout(function () { stream([[ui.lang === 'en' ? 'Subject: Updated 2026 vacation policy — what changes for you' : 'เรื่อง: แจ้งนโยบายลาพักร้อนปี 2026 — สิ่งที่เปลี่ยนแปลงสำหรับพนักงาน']]); }, 600); timers.current.push(t); }
    function uploadDoc() {
      var has = ref.current.docs.some(function (d) { return d.id === 'd1'; });
      var nd = has ? { id: 'dn' + Date.now(), name: 'คู่มือสวัสดิการ 2026.pdf', ext: 'pdf', size: '8.1 MB', version: 1, date: 'เมื่อสักครู่', status: 'pending', owner: user.name.split(' ')[0], shares: [] }
        : Object.assign(clone(DATA.docs[0]), { version: 1, date: 'เมื่อสักครู่', status: 'pending', shares: [] });
      set(function (p) { return { docs: [nd].concat(p.docs) }; });
      toast('info', L('อัปโหลดแล้ว — กำลังประมวลผล', 'Uploaded — processing'), L('ระบบจะแจ้งเมื่อพร้อมใช้ในแชต', 'We’ll let you know when it’s ready for chat'));
      emit('upload');
      var prog = 0;
      var iv = setInterval(function () {
        prog += 14;
        set(function (p) { return { docs: p.docs.map(function (d) { return d.id !== nd.id ? d : prog >= 100 ? Object.assign({}, d, { status: 'ready', progress: null }) : Object.assign({}, d, { status: 'processing', progress: prog, note: 'OCR หน้า ' + Math.round(prog / 100 * 12) + '/12' }); }) }; });
        if (prog >= 100) { clearInterval(iv); toast('success', L('เอกสารพร้อมใช้แล้ว', 'Document ready'), nd.name); emit('doc-ready'); }
      }, 550);
      timers.current.push(iv);
    }
    function createFile() {
      var s0 = ref.current; var ext = s0.fileFormat; var id = 'an' + Date.now();
      var name = (s0.filePrompt || 'ไฟล์ใหม่').slice(0, 28).trim() + '.' + ext;
      set(function (p) { return { variant: 'default', artifacts: [{ id: id, name: name, ext: ext, model: 'GPT-5.1', date: L('เมื่อสักครู่', 'Just now'), status: 'pending' }].concat(p.artifacts) }; });
      var t1 = setTimeout(function () { set(function (p) { return { artifacts: p.artifacts.map(function (a) { return a.id === id ? Object.assign({}, a, { status: 'processing' }) : a; }) }; }); }, 900);
      var t2 = setTimeout(function () { set(function (p) { return { artifacts: p.artifacts.map(function (a) { return a.id === id ? Object.assign({}, a, { status: 'ready', size: '286 KB' }) : a; }) }; }); toast('success', L('สร้างไฟล์เสร็จแล้ว', 'File ready'), name); }, 3600);
      timers.current.push(t1, t2);
    }
    function openDialog(d, target) { set({ dialog: d, dialogTarget: target || null, docMenu: null, menuChat: null }); if (d === 'create-user') emit('create-user-open'); }
    function closeDialog() { set({ dialog: null, dialogTarget: null }); }

    var app = {
      route: s.route, variant: s.variant, role: role, perms: perms, user: user, models: DATA.models.filter(function (m) { return m.enabled; }).concat(s.route === 'org' ? [DATA.models[3]] : []),
      composer: s.composer, thread: s.thread, streaming: s.streaming, openSource: s.openSource, docs: s.docs, artifacts: s.artifacts, users: s.users, groups: s.groups,
      docMenu: s.docMenu, setDocMenu: function (x) { set({ docMenu: x }); }, orgSub: s.orgSub, setOrgSub: function (x) { set({ orgSub: x }); },
      filePrompt: s.filePrompt, setFilePrompt: function (x) { set({ filePrompt: x }); }, fileFormat: s.fileFormat, setFileFormat: function (x) { set({ fileFormat: x }); },
      navigate: navigate, setComposer: setComposer, onPick: onPick, onPickDoc: onPickDoc, removeAttachment: removeAttachment, send: send, stop: stop, retry: retry,
      setOpenSource: function (n) { set({ openSource: n }); if (n) emit('cite-open'); }, uploadDoc: uploadDoc, createFile: createFile, openDialog: openDialog, toast: toast, emit: emit,
      setUserStatus: function (id, st) { set(function (p) { return { users: p.users.map(function (u) { return u.id === id ? Object.assign({}, u, { status: st }) : u; }) }; }); toast('success', st === 'active' ? L('เปิดใช้งานบัญชีแล้ว', 'Account activated') : L('ระงับบัญชีแล้ว', 'Account suspended')); },
      togglePerm: function (gid, perm) { set(function (p) { return { groups: p.groups.map(function (g) { if (g.id !== gid) return g; var has = g.perms.indexOf(perm) >= 0; return Object.assign({}, g, { perms: has ? g.perms.filter(function (x) { return x !== perm; }) : g.perms.concat([perm]) }); }) }; }); },
      setUI: props.setUI || function () { }, theme: currentTheme(ui), fontAdjust: ui.fontAdjust == null ? 1 : ui.fontAdjust
    };

    if (s.route === 'login') return h(LoginScreen, { variant: s.variant, onLogin: function () { set({ route: s.role === 'admin' && props.flow === 'admin' ? 'chat' : 'chat', variant: 'default' }); emit('login'); }, onForgot: function () { set({ route: 'reset', variant: 'request' }); } });
    if (s.route === 'reset') return h(ResetScreen, { variant: s.variant === 'default' ? 'request' : s.variant, onBack: function () { set({ route: 'login', variant: 'default' }); } });

    var titles = { chat: L('แชตใหม่', 'New chat'), thread: (s.chats.filter(function (c) { return c.id === s.currentChat; })[0] || {}).title, knowledge: L('คลังความรู้', 'Knowledge'), files: L('สร้างไฟล์', 'Create files'), org: L('องค์กร', 'Organization'), usage: 'AI Usage & Limits', settings: L('ตั้งค่า', 'Settings') };
    var screen = s.route === 'chat' || s.route === 'thread' ? h(ChatScreen, { app: app }) : s.route === 'knowledge' ? h(KnowledgeScreen, { app: app }) : s.route === 'files' ? h(FilesScreen, { app: app }) : s.route === 'org' ? h(OrgScreen, { app: app }) : s.route === 'usage' ? h(UsageScreen, { app: app }) : h(SettingsScreen, { app: app });

    var target = s.dialogTarget;
    var doc = s.docs.filter(function (d) { return d.id === target; })[0];
    var dialog = null;
    if (s.dialog === 'delete-chat') dialog = h(Dialog, { size: 'sm', tone: 'danger', icon: 'trash', title: L('ลบแชตนี้?', 'Delete this chat?'), description: L('ข้อความและไฟล์แนบในแชตนี้จะถูกลบถาวร และกู้คืนไม่ได้', 'Messages and attachments in this chat are permanently deleted.'), onClose: closeDialog, footer: [h(Button, { key: 1, variant: 'ghost', onClick: closeDialog }, L('ยกเลิก', 'Cancel')), h(Button, { key: 2, variant: 'danger', onClick: function () { set(function (p) { return { chats: p.chats.filter(function (c) { return c.id !== target; }), dialog: null }; }); toast('success', L('ลบแชตแล้ว', 'Chat deleted')); } }, L('ลบแชต', 'Delete chat'))] });
    if (s.dialog === 'delete-doc' && doc) dialog = h(Dialog, { size: 'sm', tone: 'danger', icon: 'trash', title: L('ลบเอกสาร “' + doc.name + '”?', 'Delete “' + doc.name + '”?'), description: L('ลบทุกเวอร์ชัน (' + doc.version + ') และการแชร์ทั้งหมด แชตเดิมที่เคยอ้างอิงจะเปิดแหล่งข้อมูลนี้ไม่ได้อีก', 'All ' + doc.version + ' versions and shares are removed. Past chats citing it can no longer open the source.'), onClose: closeDialog, footer: [h(Button, { key: 1, variant: 'ghost', onClick: closeDialog }, L('ยกเลิก', 'Cancel')), h(Button, { key: 2, variant: 'danger', onClick: function () { set(function (p) { return { docs: p.docs.filter(function (d) { return d.id !== target; }), dialog: null }; }); toast('success', L('ลบเอกสารแล้ว', 'Document deleted')); } }, L('ลบเอกสาร', 'Delete document'))] });
    if (s.dialog === 'delete-artifact') dialog = h(Dialog, { size: 'sm', tone: 'danger', icon: 'trash', title: L('ลบไฟล์ที่สร้าง?', 'Delete generated file?'), description: L('ไฟล์จะถูกลบถาวรและดาวน์โหลดไม่ได้อีก', 'The file is permanently deleted.'), onClose: closeDialog, footer: [h(Button, { key: 1, variant: 'ghost', onClick: closeDialog }, L('ยกเลิก', 'Cancel')), h(Button, { key: 2, variant: 'danger', onClick: function () { set(function (p) { return { artifacts: p.artifacts.filter(function (a) { return a.id !== target; }), dialog: null }; }); } }, L('ลบไฟล์', 'Delete file'))] });
    if (s.dialog === 'cleanup') dialog = h(Dialog, { size: 'sm', tone: 'danger', icon: 'alert', title: L('สั่ง Cleanup ตอนนี้?', 'Run cleanup now?'), description: L('จะลบแชต 214 รายการ และไฟล์ 18 ไฟล์ที่เกินระยะเวลาตามนโยบาย การลบนี้กู้คืนไม่ได้และจะบันทึกลง Audit log', 'This deletes 214 chats and 18 files past retention. It can’t be undone and is recorded in the audit log.'), onClose: closeDialog, footer: [h(Button, { key: 1, variant: 'ghost', onClick: closeDialog }, L('ยกเลิก', 'Cancel')), h(Button, { key: 2, variant: 'danger', onClick: function () { closeDialog(); toast('success', L('Cleanup เสร็จแล้ว', 'Cleanup complete'), L('ลบ 232 รายการ', '232 items deleted')); } }, L('ลบข้อมูลที่หมดอายุ', 'Delete expired data'))] });
    if (s.dialog === 'suspend') { var su = s.users.filter(function (u) { return u.id === target; })[0] || s.users[2]; dialog = h(Dialog, { size: 'sm', tone: 'danger', icon: 'lock', title: L('ระงับบัญชี ' + su.name + '?', 'Suspend ' + su.name + '?'), description: L('ผู้ใช้จะออกจากระบบทันทีและเข้าสู่ระบบไม่ได้จนกว่าจะเปิดใช้งานอีกครั้ง ข้อมูลยังอยู่ครบ', 'They’re signed out immediately and can’t sign in until reactivated. Their data is kept.'), onClose: closeDialog, footer: [h(Button, { key: 1, variant: 'ghost', onClick: closeDialog }, L('ยกเลิก', 'Cancel')), h(Button, { key: 2, variant: 'danger', onClick: function () { closeDialog(); app.setUserStatus(su.id, 'suspended'); } }, L('ระงับบัญชี', 'Suspend account'))] }); }
    if (s.dialog === 'share' && doc) dialog = h(Dialog, {
      title: L('แชร์ “' + doc.name + '”', 'Share “' + doc.name + '”'), description: L('เฉพาะเจ้าของเอกสารจัดการการแชร์ได้ · ผู้มีสิทธิ์แก้ไขอัปโหลดเวอร์ชันใหม่ได้', 'Only the owner manages sharing · Editors can upload new versions'), onClose: closeDialog,
      footer: [h(Button, { key: 1, variant: 'ghost', onClick: closeDialog }, L('ยกเลิก', 'Cancel')), h(Button, { key: 2, variant: 'primary', onClick: function () { closeDialog(); toast('success', L('อัปเดตการแชร์แล้ว', 'Sharing updated')); } }, L('บันทึก', 'Save'))]
    },
      h('div', { className: 'ba-row ba-gap-2' }, h('div', { className: 'ba-grow' }, h(Select, { options: [L('เลือกกลุ่ม…', 'Choose a group…'), 'Marketing', 'Sales', 'Administrators'] })), h(Select, { options: [{ value: 'view', label: L('ดูได้', 'Can view') }, { value: 'edit', label: L('แก้ไขได้', 'Can edit') }], wrapStyle: { width: 140 } }), h(Button, null, L('เพิ่ม', 'Add'))),
      h('div', { className: 'ba-doclist' }, [{ g: L('คุณ (เจ้าของ)', 'You (owner)'), p: 'owner' }].concat(doc.shares).map(function (sh) {
        return h('div', { key: sh.g, className: 'ba-docrow', style: { alignItems: 'center', padding: '10px 14px' } }, h('span', { className: 'ba-avatar', style: { width: 30, height: 30, fontSize: 12 } }, h(Icon, { name: sh.p === 'owner' ? 'user' : 'users', size: 15 })), h('div', { className: 'ba-grow', style: { fontWeight: 500 } }, sh.g),
          sh.p === 'owner' ? h('span', { className: 'ba-t-small ba-muted' }, L('เจ้าของ', 'Owner')) : h(Fragment, null, h(Select, { size: 'sm', defaultValue: sh.p, options: [{ value: 'view', label: L('ดูได้', 'Can view') }, { value: 'edit', label: L('แก้ไขได้', 'Can edit') }], wrapStyle: { width: 130 } }), h(IconButton, { icon: 'x', size: 'sm', label: L('เลิกแชร์', 'Remove') })));
      })));
    if (s.dialog === 'versions' && doc) dialog = h(Dialog, { title: L('เวอร์ชันของ “' + doc.name + '”', 'Versions of “' + doc.name + '”'), description: L('แชตค้นเฉพาะเวอร์ชันปัจจุบัน เวอร์ชันเก่ายังดาวน์โหลดได้', 'Chat searches the current version only; older versions stay downloadable'), onClose: closeDialog, footer: h(Button, { icon: 'upload', variant: 'primary' }, L('อัปโหลดเวอร์ชันใหม่', 'Upload new version')) },
      h('div', { className: 'ba-doclist' }, [[3, '24 ต.ค. 2026', 'ศิริพร ว.', '2.4 MB', true], [2, '2 ก.ย. 2026', 'ณัฐธิดา ก.', '2.3 MB'], [1, '15 ม.ค. 2026', 'ศิริพร ว.', '2.1 MB']].map(function (r) {
        return h('div', { key: r[0], className: 'ba-docrow', style: { alignItems: 'center' } }, h('span', { className: 'ba-filetype' }, 'v' + r[0]), h('div', { className: 'ba-grow' }, h('div', { style: { fontWeight: 500 } }, r[1], r[4] ? h('span', { className: 'ba-badge ba-badge-info', style: { marginLeft: 8 } }, L('ปัจจุบัน · ใช้ในแชต', 'Current · used in chat')) : null), h('div', { className: 'ba-t-small ba-muted' }, r[2] + ' · ' + r[3])), h(IconButton, { icon: 'download', label: L('ดาวน์โหลด', 'Download') }));
      })));
    if (s.dialog === 'create-user') dialog = h(Dialog, {
      icon: 'user-plus', tone: 'info', title: L('สร้างผู้ใช้ใหม่', 'Create user'), description: L('ระบบสร้างรหัสผ่านชั่วคราวให้ และบังคับเปลี่ยนเมื่อเข้าสู่ระบบครั้งแรก', 'A temporary password is generated; the user must change it at first sign-in'), onClose: closeDialog,
      footer: [h(Button, { key: 1, variant: 'ghost', onClick: closeDialog }, L('ยกเลิก', 'Cancel')), h(Button, { key: 2, variant: 'primary', onClick: function () { set(function (p) { return { dialog: 'temp-password', newUser: { email: 'kanokwan@siamdemo.co.th', name: 'กนกวรรณ ใจดี', pw: 'Tmp-9fK2-qX7m-41aZ' }, users: p.users.concat([{ id: 'u7', name: 'กนกวรรณ ใจดี', email: 'kanokwan@siamdemo.co.th', groups: ['Marketing', 'All staff'], status: 'active', last: '—' }]) }; }); emit('user-created'); } }, L('สร้างผู้ใช้', 'Create user'))]
    },
      h(Field, { label: L('อีเมล', 'Email'), required: true }, h(TextInput, { type: 'email', defaultValue: 'kanokwan@siamdemo.co.th' })),
      h(Field, { label: L('ชื่อที่แสดง', 'Display name') }, h(TextInput, { defaultValue: 'กนกวรรณ ใจดี' })),
      h('div', { className: 'ba-field' }, h('span', { className: 'ba-field-label' }, L('กลุ่ม', 'Groups')), h('div', { className: 'ba-row ba-gap-2 ba-wrap' }, ['Marketing', 'All staff'].map(function (g) { return h('span', { key: g, className: 'ba-chip ba-chip-brand' }, g, h('button', { type: 'button', 'aria-label': 'Remove ' + g }, h(Icon, { name: 'x', size: 13 }))); }), h(Button, { size: 'sm', variant: 'ghost', icon: 'plus' }, L('เพิ่มกลุ่ม', 'Add group'))), h('span', { className: 'ba-field-hint' }, L('สิทธิ์ของผู้ใช้มาจากกลุ่มที่สังกัด', 'Permissions come from the user’s groups'))));
    if (s.dialog === 'temp-password' && s.newUser) dialog = h(Dialog, {
      icon: 'check-circle', tone: 'success', title: L('สร้างผู้ใช้เรียบร้อย', 'User created'), description: s.newUser.name + ' · ' + s.newUser.email, onClose: null,
      footer: h(Button, { variant: 'primary', onClick: function () { closeDialog(); emit('temp-closed'); } }, L('ฉันบันทึกรหัสผ่านแล้ว', 'I’ve saved the password'))
    },
      h(Alert, { tone: 'warning', title: L('รหัสผ่านชั่วคราวแสดงครั้งเดียวเท่านั้น', 'This temporary password is shown only once') }, L('คัดลอกแล้วส่งให้ผู้ใช้ผ่านช่องทางที่ปลอดภัย เมื่อปิดหน้าต่างนี้จะดูอีกไม่ได้', 'Copy it and send it through a secure channel. You can’t view it again after closing.')),
      h('div', { className: 'ba-code' }, h('span', null, s.newUser.pw), h(Button, { size: 'sm', icon: 'copy', onClick: function () { toast('success', L('คัดลอกแล้ว', 'Copied')); } }, L('คัดลอก', 'Copy'))));

    var sidebar = {
      active: s.route, perms: perms, user: user, chats: s.chats, currentChat: s.route === 'thread' ? s.currentChat : null, menuChat: s.menuChat, renameChat: s.renameChat,
      onNavigate: navigate, onNewChat: function () { navigate('chat'); },
      onOpenChat: function (id) { var lang = ui.lang === 'en' ? 'en' : 'th'; set({ route: 'thread', variant: 'default', currentChat: id, menuChat: null, openSource: null, thread: [{ role: 'user', text: ANSWER[lang].q }, { role: 'assistant', paras: ANSWER[lang].paras, sources: SOURCES_DOC, meta: 'GPT-5.1 · 09:16' }] }); },
      onChatMenu: function (id) { set({ menuChat: id }); },
      onChatAction: function (id, a, val) {
        if (a === 'pin') { set(function (p) { return { menuChat: null, chats: p.chats.map(function (c) { return c.id === id ? Object.assign({}, c, { pinned: !c.pinned }) : c; }) }; }); }
        if (a === 'rename') set({ renameChat: id, menuChat: null });
        if (a === 'renamed') set(function (p) { return { renameChat: null, chats: val ? p.chats.map(function (c) { return c.id === id ? Object.assign({}, c, { title: val }) : c; }) : p.chats }; });
        if (a === 'export') { set({ menuChat: null }); toast('success', L('ส่งออกแชตแล้ว', 'Chat exported'), L('ดาวน์โหลดไฟล์ .md เรียบร้อย', 'Downloaded as .md')); }
        if (a === 'delete') openDialog('delete-chat', id);
      },
      onSignOut: function () { set({ route: 'login', variant: 'default' }); }
    };
    var overlay = h(Fragment, null, dialog, s.toasts.length ? h('div', { className: 'ba-toasts' }, s.toasts.map(function (t) { return h(Toast, { key: t.id, tone: t.tone, title: t.title, onClose: function () { set(function (p) { return { toasts: p.toasts.filter(function (x) { return x.id !== t.id; }) }; }); } }, t.body); })) : null);
    return h(AppShell, { title: titles[s.route], sidebar: sidebar, onSettings: function () { navigate('settings'); }, overlay: overlay, quietHeader: s.route === 'chat', drawerOpen: props.drawerOpen }, screen);
  }

  /* ---------------- showcase frame: device · theme · languages · font size · state ---------------- */
  function Toolbar(props) {
    return h('div', { className: 'ba-frame-bar' }, props.items.map(function (it) {
      return h(Fragment, { key: it.label }, h('span', { className: 'lbl' }, it.label), h(Segmented, { size: 'sm', value: it.value, onChange: it.onChange, options: it.options }));
    }), props.children);
  }
  function useFrameUI(init) {
    var _u = useState(Object.assign({ device: 'desktop', theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', lang: 'th', navLang: 'en', fontAdjust: 1 }, init || {})), u = _u[0], setU = _u[1];
    return [u, function (p) { setU(function (prev) { return Object.assign({}, prev, p); }); }];
  }
  function Frame(props) {
    var u = props.ui;
    var ctx = { lang: u.lang, navLang: u.navLang, theme: u.theme, mobile: u.device === 'mobile', fontAdjust: u.fontAdjust };
    return h('div', { className: 'ba-frame-stage' }, h('div', { className: cx('ba-frame', u.device === 'mobile' ? 'ba-frame-mobile' : 'ba-frame-desktop') },
      h(UICtx.Provider, { value: ctx }, h('div', { className: 'ba-scope', 'data-theme': u.theme, style: { '--font-adjust': u.fontAdjust + 'pt', height: '100%', position: 'relative' } }, props.children))));
  }
  function uiBar(u, set) {
    return [
      { label: 'Device', value: u.device, onChange: function (v) { set({ device: v }); }, options: [{ value: 'desktop', label: 'Desktop' }, { value: 'mobile', label: 'Mobile' }] },
      { label: 'Theme', value: u.theme, onChange: function (v) { set({ theme: v }); }, options: [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }] },
      { label: 'Content', value: u.lang, onChange: function (v) { set({ lang: v }); }, options: [{ value: 'th', label: 'ไทย' }, { value: 'en', label: 'EN' }] },
      { label: 'Menu', value: u.navLang, onChange: function (v) { set({ navLang: v }); }, options: [{ value: 'en', label: 'EN' }, { value: 'th', label: 'ไทย' }] },
      { label: 'Font', value: String(u.fontAdjust), onChange: function (v) { set({ fontAdjust: +v }); }, options: ['0', '1', '2', '3', '4'].map(function (x) { return { value: x, label: '+' + x }; }) }
    ];
  }
  function ScreenFrame(props) {
    var states = props.states || [{ id: 'default', label: 'Default' }];
    var f = useFrameUI(props.ui), u = f[0], set = f[1];
    var _st = useState(props.defaultState || states[0].id), st = _st[0], setSt = _st[1];
    var _role = useState(props.role || 'admin'), role = _role[0], setRole = _role[1];
    var cur = states.filter(function (x) { return x.id === st; })[0] || states[0];
    var route = cur.route || props.route;
    var items = uiBar(u, set);
    if (props.roles) items.push({ label: 'Role', value: role, onChange: setRole, options: [{ value: 'admin', label: 'Admin' }, { value: 'member', label: 'Member' }] });
    return h('div', { className: 'ba-frame-wrap' },
      h(Toolbar, { items: items }),
      h('div', { className: 'ba-frame-bar' }, h('span', { className: 'lbl' }, 'State'), h(Segmented, { size: 'sm', value: st, onChange: setSt, options: states.map(function (x) { return { value: x.id, label: x.label }; }) })),
      cur.note ? h('div', { className: 'ba-frame-note' }, cur.note) : null,
      h(Frame, { ui: u }, h(BenterApp, { key: [st, role, u.lang, u.device].join('|'), route: route, variant: cur.variant || cur.id, role: cur.role || role, drawerOpen: cur.drawer && u.device === 'mobile', setUI: set })));
  }

  /* ---------------- clickable prototype with two guided flows ---------------- */
  var FLOWS = {
    knowledge: { title: 'Login > Chat > เพิ่มเอกสาร > เลือก Knowledge > คำตอบพร้อม citation', role: 'admin', steps: [
      ['login', 'เข้าสู่ระบบ', 'กด “เข้าสู่ระบบ” (กรอกอะไรก็ได้)'],
      ['nav:knowledge', 'เปิด Knowledge', 'เมนูซ้าย > Knowledge'],
      ['upload', 'อัปโหลดเอกสาร', 'กด “อัปโหลดเอกสาร”'],
      ['doc-ready', 'รอประมวลผล / OCR', 'สถานะเปลี่ยน รอคิว > กำลังประมวลผล > พร้อมใช้'],
      ['kb-select', 'เลือกเอกสารในแชต', 'AI conversations > ปุ่ม + > เพิ่มจากไลบรารี > เลือก “นโยบายลาพักร้อน 2026.pdf”'],
      ['send', 'ส่งคำถาม', 'คำถามถูกเติมให้แล้ว กดส่ง (ลูกศร)'],
      ['cite-open', 'เปิดแหล่งอ้างอิง', 'กดเลข [1] หรือการ์ดแหล่งอ้างอิง เพื่อดูหน้าเอกสาร']] },
    admin: { title: 'Admin > สร้างผู้ใช้ > กำหนดสิทธิ์', role: 'admin', steps: [
      ['login', 'เข้าสู่ระบบในฐานะผู้ดูแล', 'กด “เข้าสู่ระบบ”'],
      ['nav:org', 'เปิด Organization', 'เมนูซ้าย > Organization'],
      ['create-user-open', 'เริ่มสร้างผู้ใช้', 'กด “สร้างผู้ใช้”'],
      ['user-created', 'ยืนยันข้อมูลผู้ใช้', 'ตรวจอีเมลและกลุ่ม แล้วกด “สร้างผู้ใช้”'],
      ['temp-closed', 'เก็บรหัสผ่านชั่วคราว', 'คัดลอกแล้วกด “ฉันบันทึกรหัสผ่านแล้ว”'],
      ['groups', 'เปิดกลุ่มและสิทธิ์', 'แท็บย่อย “กลุ่มและสิทธิ์”'],
      ['group-saved', 'กำหนดสิทธิ์ให้กลุ่ม', 'ติ๊กสิทธิ์ของกลุ่ม Marketing แล้วกด “บันทึกการเปลี่ยนแปลง”']] }
  };
  function Prototype(props) {
    var f = useFrameUI(), u = f[0], set = f[1];
    var _flow = useState(props.flow || 'knowledge'), flow = _flow[0], setFlow = _flow[1];
    var _done = useState([]), done = _done[0], setDone = _done[1];
    var _run = useState(0), run = _run[0], setRun = _run[1];
    var F = FLOWS[flow];
    var onEvent = function (e) { setDone(function (d) { return d.indexOf(e) >= 0 ? d : d.concat([e]); }); };
    var next = F.steps.filter(function (s) { return done.indexOf(s[0]) < 0; })[0];
    var restart = function (fl) { setDone([]); setRun(run + 1); if (fl) setFlow(fl); };
    return h('div', { className: 'ba-frame-wrap' },
      h(Toolbar, { items: uiBar(u, set) }),
      h('div', { className: 'ba-frame-bar' }, h('span', { className: 'lbl' }, 'Flow'), h(Segmented, { size: 'sm', value: flow, onChange: function (v) { restart(v); }, options: [{ value: 'knowledge', label: 'A · Chat + Knowledge' }, { value: 'admin', label: 'B · Admin สร้างผู้ใช้' }] }), h(Button, { size: 'sm', icon: 'refresh', onClick: function () { restart(); } }, 'เริ่มใหม่')),
      h('div', { className: 'ba-card', style: { padding: '12px 14px', maxWidth: 1280, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 } },
        h('div', { className: 'ba-row ba-gap-3', style: { justifyContent: 'space-between' } }, h('span', { className: 'ba-t-h4' }, F.title), next ? h('span', { className: 'ba-t-small ba-muted' }, 'ขั้นต่อไป > ', h('strong', { style: { color: 'var(--ink)' } }, next[2])) : h('span', { className: 'ba-row ba-gap-1 ba-t-small', style: { color: 'var(--success)', fontWeight: 600 } }, h(Icon, { name: 'check-circle', size: 15 }), 'จบ flow แล้ว — กด “เริ่มใหม่” หรือสลับ flow')),
        h('ol', { style: { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(' + F.steps.length + ', minmax(0, 1fr))', gap: 6 } },
          F.steps.map(function (s, i) {
            var ok = done.indexOf(s[0]) >= 0, cur = next && next[0] === s[0];
            return h('li', { key: s[0], style: { display: 'flex', gap: 8, alignItems: 'flex-start', padding: '8px 8px', borderRadius: 6, background: cur ? 'var(--brand-soft)' : 'var(--surface-subtle)', borderTop: '3px solid ' + (ok ? 'var(--success)' : cur ? 'var(--brand-strong)' : 'var(--line)') } },
              h('span', { style: { flex: 'none', width: 20, height: 20, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, background: ok ? 'var(--success)' : cur ? 'var(--brand-strong)' : 'var(--surface-sunken)', color: ok || cur ? 'var(--canvas)' : 'var(--ink-muted)' } }, ok ? h(Icon, { name: 'check', size: 12, strokeWidth: 3 }) : i + 1),
              h('span', { style: { fontWeight: 500, fontSize: 13, lineHeight: 1.35, color: ok ? 'var(--ink-muted)' : 'var(--ink)' } }, s[1]));
          }))),
      h('div', null,
        h(Frame, { ui: u }, h(BenterApp, { key: flow + run + u.lang + u.device, route: 'login', variant: 'default', role: F.role, flow: flow, docs: flow === 'knowledge' ? 'prototype' : null, onEvent: onEvent, setUI: set }))));
  }

  /* ---------------- export ---------------- */
  var NS = {
    Icon: Icon, Logo: Logo, Spinner: Spinner, Button: Button, IconButton: IconButton, StatusBadge: StatusBadge, ProgressBar: ProgressBar, Skeleton: Skeleton,
    Field: Field, TextInput: TextInput, Textarea: Textarea, Select: Select, Checkbox: Checkbox, Switch: Switch, Segmented: Segmented, Tabs: Tabs, Menu: Menu, Avatar: Avatar,
    Alert: Alert, EmptyState: EmptyState, Dialog: Dialog, Toast: Toast, FileType: FileType, Attachment: Attachment, DataTable: DataTable, StatTile: StatTile, UsageMeter: UsageMeter,
    NavItem: NavItem, ChatListItem: ChatListItem, Sidebar: Sidebar, AppHeader: AppHeader, MobileTopBar: MobileTopBar, AppShell: AppShell,
    PlusMenu: PlusMenu, LibraryPicker: LibraryPicker, ModelPicker: ModelPicker, Composer: Composer, Message: Message, SourceList: SourceList, DocumentRow: DocumentRow,
    BenterApp: BenterApp, ScreenFrame: ScreenFrame, Prototype: Prototype, UIContext: UICtx, data: DATA, assets: ASSETS
  };
  window.BenterAI = Object.assign(window.BenterAI || {}, NS);
})();
