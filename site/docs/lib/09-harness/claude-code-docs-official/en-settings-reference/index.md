---
title: "All settings"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/settings-reference.md"
sourceSha256: "811cfad7d21b8ebbbd64aeb288e903c6720594286d2a21d2b787639b7ab0ac1b"
pageSha256: "6a0588d81e10671c0ba4c9f75cd217a3a8f498c0afafbf95d39186403f8005dd"
contentMode: "local-full"
zh: ""
---

# All settings

> Complete reference for every Claude Code settings.json key: where each one goes, its type and default, and a paste-ready example, with an index of every key.

export const BackToIndex = (\{href = '#all-settings', label = 'Back to index'\}) => \{
  const [show, setShow] = useState(false);
  useEffect(() => \{
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, \{
      passive: true
    \});
    return () => window.removeEventListener('scroll', onScroll);
  \}, []);
  return <div className="not-prose">
      
      &lt;a className=\{'bti-btn' + (show ? ' bti-show' : '')\} href=\{href\} aria-hidden=\{!show\} tabIndex=\{show ? 0 : -1\}>
        &lt;svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">&lt;path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />&lt;/svg>
        \{label\}
    </div>;
\};

export const ReferenceFilter = (\{placeholder, noun, facets, facetOrder, columnHelp, children\}) => \{
  const useLive = init => \{
    const [v, setV] = useState(init);
    const ref = useRef(init);
    return [v, ref, x => \{
      ref.current = x;
      setV(x);
    \}];
  \};
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const plural = s => s.endsWith('y') ? s.slice(0, -1) + 'ies' : s + 's';
  const facetNames = facets || ['category', 'topic', 'scope', 'where'];
  const orderOf = \{\};
  Object.keys(facetOrder || (\{\})).forEach(k => \{
    orderOf[k] = facetOrder[k].map(x => String(x).toLowerCase());
  \});
  const rankIn = (col, v) => \{
    const list = orderOf[col];
    if (!list) return -1;
    const i = list.indexOf(String(v).toLowerCase());
    return i < 0 ? list.length : i;
  \};
  const cmpValues = col => (a, b) => \{
    const ra = rankIn(col, a);
    const rb = rankIn(col, b);
    if (ra !== rb) return ra - rb;
    return a < b ? -1 : a > b ? 1 : 0;
  \};
  const help = columnHelp || (\{\});
  const FIRST_COL_HELP = 'Click an entry to open it.';
  const optionLabel = (f, c) => c === 'All' ? 'All ' + plural(f.label.toLowerCase()) : c;
  const nounText = noun || 'entries';
  const placeholderText = placeholder || 'Filter this reference';
  const rootRef = useRef(null);
  const tablesRef = useRef(null);
  const searchRef = useRef(null);
  const menuRef = useRef(\{\});
  const [q, qRef, setQ] = useLive('');
  const [sel, selRef, setSel] = useLive(\{\});
  const [sortBy, sortRef, setSortBy] = useLive(null);
  const [menuOpen, menuOpenRef, setMenu] = useLive(null);
  const [facetList, setFacetList] = useState([]);
  const [firstHead, setFirstHead] = useState('');
  const [counts, setCounts] = useState(\{
    shown: 0,
    total: 0
  \});
  const [disabled, setDisabled] = useState(false);
  const menuBtn = name => menuRef.current[name] ? menuRef.current[name].querySelector(':scope > button') : null;
  const menuList = name => menuRef.current[name] ? menuRef.current[name].querySelector('[role="listbox"]') : null;
  const closeMenu = name => \{
    setMenu(null);
    const btn = menuBtn(name);
    if (btn) btn.focus();
  \};
  const focusSelected = name => \{
    const list = menuList(name);
    if (!list) return;
    const btn = list.querySelector('button[aria-selected="true"]') || list.querySelector('button');
    if (btn) btn.focus();
  \};
  const setFacet = (name, value) => \{
    setSel(Object.assign(\{\}, selRef.current, \{
      [name]: https://code.claude.com/docs
    \}));
    apply(qRef.current);
    closeMenu(name);
  \};
  const sortTables = by => \{
    (tablesRef.current || []).forEach(tab => \{
      const t = tab.el;
      const idx = tab.heads.indexOf(by);
      const body = t.querySelector('tbody');
      if (idx < 0 || !body) return;
      const rows = [...body.querySelectorAll('tr')];
      const keyOf = r => r.children[idx] ? r.children[idx].textContent.trim().toLowerCase() : '';
      const cmp = cmpValues(by);
      rows.map((r, i) => (\{
        r,
        i: Number(r.dataset.sfIndex !== undefined ? r.dataset.sfIndex : i),
        k: keyOf(r)
      \})).sort((a, b) => cmp(a.k, b.k) || a.i - b.i).forEach(x => body.appendChild(x.r));
      [...t.querySelectorAll('thead th')].forEach((h, i) => \{
        const sortable = tab.heads[i] === tab.heads[0] || facetNames.indexOf(tab.heads[i]) > -1;
        if (sortable) h.setAttribute('aria-sort', i === idx ? 'ascending' : 'none'); else h.removeAttribute('aria-sort');
      \});
    \});
  \};
  const scan = () => \{
    const tables = [];
    let el = rootRef.current ? rootRef.current.nextElementSibling : null;
    while (el) \{
      if (el.tagName === 'H2' || el.querySelector(':scope > h2')) break;
      const found = el.tagName === 'TABLE' ? [el] : [...el.querySelectorAll('table')];
      found.forEach(t => \{
        const headCells = [...t.querySelectorAll('thead th, thead td')];
        const heads = headCells.map(h => h.textContent.trim().toLowerCase());
        if (heads.length === 0) return;
        const facetIdx = \{\};
        heads.forEach((h, i) => \{
          if (facetNames.indexOf(h) > -1) facetIdx[h] = i;
        \});
        if (!t.dataset.sfDecorated) \{
          t.dataset.sfDecorated = '1';
          headCells.forEach((h, i) => \{
            const text = i === 0 ? help[heads[0]] || FIRST_COL_HELP : help[heads[i]];
            if (text) h.title = text;
          \});
        \}
        const rows = [...t.querySelectorAll('tbody tr')].map((r, i) => \{
          if (r.dataset.sfIndex === undefined) r.dataset.sfIndex = String(i);
          const cells = r.querySelectorAll('td');
          const fv = \{\};
          Object.keys(facetIdx).forEach(h => \{
            fv[h] = cells[facetIdx[h]] ? cells[facetIdx[h]].textContent.trim() : '';
          \});
          return \{
            el: r,
            text: [...cells].map(c => c.textContent).join(' ').toLowerCase(),
            facets: fv,
            anchors: [...r.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href').slice(1)),
            ids: [...r.querySelectorAll('[id]')].map(n => n.id)
          \};
        \});
        tables.push(\{
          el: t,
          box: t.closest('[data-table-wrapper]') || t,
          rows,
          heads
        \});
      \});
      el = el.nextElementSibling;
    \}
    tablesRef.current = tables;
    if (sortRef.current) sortTables(sortRef.current);
    return tables;
  \};
  const apply = query => \{
    let tables = tablesRef.current || scan();
    if (tables.some(t => !t.el.isConnected)) tables = scan();
    const needle = query.trim().toLowerCase();
    const sel = selRef.current;
    const activeFacets = Object.keys(sel).filter(h => sel[h] && sel[h] !== 'All');
    const show = (el, on) => \{
      const want = on ? '' : 'none';
      if (el.style.display !== want) el.style.display = want;
    \};
    let total = 0;
    let shown = 0;
    const visibleTargets = new Set();
    tables.forEach(t => \{
      let tableVisible = 0;
      t.rows.forEach(row => \{
        total += 1;
        const catOk = activeFacets.every(h => \{
          const v = row.facets[h];
          return v === sel[h] || v === '' || v === undefined;
        \});
        const match = catOk && (needle === '' || row.text.includes(needle));
        show(row.el, match);
        if (match) \{
          tableVisible += 1;
          row.anchors.forEach(a => visibleTargets.add(a));
        \}
      \});
      show(t.box, !(t.rows.length > 0 && tableVisible === 0));
      shown += tableVisible;
    \});
    if (shown < total && visibleTargets.size > 0) \{
      tables.forEach(t => \{
        t.rows.forEach(row => \{
          if (row.el.style.display === 'none' && row.ids.some(id => visibleTargets.has(id))) \{
            show(row.el, true);
            show(t.box, true);
            shown += 1;
          \}
        \});
      \});
    \}
    setCounts(\{
      shown,
      total
    \});
    return total;
  \};
  const deriveFacets = tables => \{
    const seen = \{\};
    tables.forEach(t => t.rows.forEach(r => \{
      Object.keys(r.facets).forEach(h => \{
        if (!seen[h]) seen[h] = [];
        if (r.facets[h] && seen[h].indexOf(r.facets[h]) === -1) seen[h].push(r.facets[h]);
      \});
    \}));
    const list = facetNames.filter(h => seen[h] && seen[h].length > 0).map(h => (\{
      name: h,
      label: cap(h),
      values: seen[h].sort(cmpValues(h))
    \}));
    setFacetList(list);
    const first = tables[0] ? tables[0].heads[0] : '';
    setFirstHead(first);
    if (!sortRef.current && first) \{
      setSortBy(first);
      sortTables(first);
    \}
    const init = \{\};
    list.forEach(f => \{
      init[f.name] = selRef.current[f.name] || 'All';
    \});
    setSel(init);
  \};
  const onChange = value => \{
    setQ(value);
    apply(value);
  \};
  const clearAll = () => \{
    const next = \{\};
    Object.keys(selRef.current).forEach(k => \{
      next[k] = 'All';
    \});
    setSel(next);
    setQ('');
    apply('');
    if (searchRef.current) searchRef.current.focus();
  \};
  useEffect(() => \{
    const tables = scan();
    deriveFacets(tables);
    const total = apply('');
    let retryTimer;
    if (total === 0) \{
      retryTimer = setTimeout(() => \{
        tablesRef.current = null;
        if (apply(qRef.current) > 0) deriveFacets(tablesRef.current); else setDisabled(true);
      \}, 500);
    \}
    const onKey = e => \{
      if (e.key === 'Escape' && menuOpenRef.current !== null) closeMenu(menuOpenRef.current);
      if (!searchRef.current) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const active = document.activeElement;
      const tag = active && active.tagName;
      const editable = active && active.isContentEditable;
      const interactive = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON' || tag === 'A' || editable || active && active.getAttribute && active.getAttribute('role');
      if (e.key === '/' && !interactive) \{
        const r = rootRef.current ? rootRef.current.getBoundingClientRect() : null;
        if (r && r.bottom > 0 && r.top < (window.innerHeight || 0)) \{
          e.preventDefault();
          setMenu(null);
          searchRef.current.focus();
        \}
      \}
      if (e.key === 'Escape' && menuOpenRef.current === null && active === searchRef.current) \{
        onChange('');
        searchRef.current.blur();
      \}
    \};
    const onDocClick = e => \{
      const open = menuOpenRef.current;
      if (open !== null && menuRef.current[open] && !menuRef.current[open].contains(e.target)) setMenu(null);
    \};
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDocClick);
    return () => \{
      if (retryTimer) clearTimeout(retryTimer);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDocClick);
      (tablesRef.current || []).forEach(t => \{
        t.box.style.display = '';
        t.rows.forEach(row => \{
          row.el.style.display = '';
        \});
      \});
    \};
  \}, []);
  useEffect(() => \{
    if (menuOpen !== null) focusSelected(menuOpen);
  \}, [menuOpen]);
  if (disabled) return null;
  const facetActive = Object.keys(sel).some(h => sel[h] && sel[h] !== 'All');
  const sortOptions = [firstHead].concat(facetList.map(f => f.name)).filter((h, i, a) => h && a.indexOf(h) === i);
  return <>
      
      &lt;div ref=\{rootRef\} className="sf-root" style=&#123;&#123;
    margin: '16px 0 8px'
  &#125;&#125;>
        &lt;div style=&#123;&#123;
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    alignItems: 'center'
  &#125;&#125;>
        &lt;div style=&#123;&#123;
    position: 'relative',
    flex: '1 1 260px',
    maxWidth: '480px'
  &#125;&#125;>
          &lt;input ref=\{searchRef\} value=\{q\} onChange=\{e => onChange(e.target.value)\} placeholder=\{placeholderText\} aria-label=\{placeholderText\} style=&#123;&#123;
    width: '100%',
    padding: '8px 56px 8px 12px',
    borderRadius: '8px',
    border: '1px solid var(--sf-border)',
    background: 'var(--sf-bg)',
    color: 'var(--sf-text)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  &#125;&#125; />
          \{q ? &lt;button type="button" onClick=\{() => \{
    onChange('');
    if (searchRef.current) searchRef.current.focus();
  &#125;&#125; aria-label="Clear text" className="sf-end sf-x">
              ×
            &lt;/button> : &lt;span className="sf-end" style=&#123;&#123;
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: '11px',
    color: 'var(--sf-text-4)',
    border: '1px solid var(--sf-border)',
    borderRadius: '3px',
    padding: '0 5px',
    pointerEvents: 'none'
  &#125;&#125;>
              /
            &lt;/span>\}
        
        \{facetList.map(f => \{
    const cur = sel[f.name] || 'All';
    const isOpen = menuOpen === f.name;
    return &lt;div key=\{f.name\} ref=\{el => \{
      menuRef.current[f.name] = el;
    &#125;&#125; style=&#123;&#123;
      position: 'relative'
    &#125;&#125;>
            &lt;button type="button" onClick=\{() => setMenu(isOpen ? null : f.name)\} onKeyDown=\{e => \{
      if (e.key === 'ArrowDown') \{
        e.preventDefault();
        if (!isOpen) setMenu(f.name); else focusSelected(f.name);
      \}
    &#125;&#125; aria-haspopup="listbox" aria-expanded=\{isOpen\} style=&#123;&#123;
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: cur !== 'All' ? '8px 30px 8px 12px' : '8px 12px',
      borderRadius: '8px',
      border: '1px solid ' + (cur !== 'All' ? 'var(--sf-accent)' : 'var(--sf-border)'),
      background: 'var(--sf-bg)',
      color: cur === 'All' ? 'var(--sf-text-3)' : 'var(--sf-text)',
      fontSize: '13.5px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      maxWidth: '260px'
    &#125;&#125;>
              &lt;span style=&#123;&#123;
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    &#125;&#125;>
                \{f.label + ': ' + optionLabel(f, cur)\}
              &lt;/span>
              &lt;span aria-hidden="true" style=&#123;&#123;
      fontSize: '9px',
      color: 'var(--sf-text-4)',
      transform: isOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 120ms'
    &#125;&#125;>
                ▼
              &lt;/span>
            &lt;/button>
            \{cur !== 'All' && &lt;button type="button" onClick=\{() => setFacet(f.name, 'All')\} aria-label=\{'Clear ' + f.label + ' filter'\} title=\{'Clear ' + f.label + ' filter'\} className="sf-end sf-x">
                ×
              &lt;/button>\}
            \{isOpen && &lt;div role="listbox" aria-label=\{f.label\} onKeyDown=\{e => \{
      const items = [...e.currentTarget.querySelectorAll('button')];
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') \{
        e.preventDefault();
        (items[idx + 1] || items[0]).focus();
      \} else if (e.key === 'ArrowUp') \{
        e.preventDefault();
        (items[idx - 1] || items[items.length - 1]).focus();
      \} else if (e.key === 'Home') \{
        e.preventDefault();
        if (items[0]) items[0].focus();
      \} else if (e.key === 'End') \{
        e.preventDefault();
        if (items[items.length - 1]) items[items.length - 1].focus();
      \} else if (e.key === 'Tab') \{
        closeMenu(f.name);
      \}
    &#125;&#125; style=&#123;&#123;
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      zIndex: 1000,
      minWidth: '260px',
      maxHeight: '340px',
      overflowY: 'auto',
      background: 'var(--sf-bg)',
      border: '1px solid var(--sf-border)',
      borderRadius: '10px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      padding: '5px'
    &#125;&#125;>
                \{['All'].concat(f.values).map(c => \{
      const selected = cur === c;
      return &lt;button key=\{c\} role="option" aria-selected=\{selected\} tabIndex=\{-1\} onClick=\{() => setFacet(f.name, c)\} style=&#123;&#123;
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        textAlign: 'left',
        padding: '7px 10px',
        borderRadius: '6px',
        border: 'none',
        background: 'transparent',
        color: selected ? 'var(--sf-accent)' : 'var(--sf-text)',
        fontWeight: selected ? 600 : 400,
        fontSize: '13.5px',
        cursor: 'pointer'
      &#125;&#125;>
                      &lt;span aria-hidden="true" style=&#123;&#123;
        width: '14px',
        color: 'var(--sf-accent)',
        flexShrink: 0
      &#125;&#125;>
                        \{selected ? '✓' : ''\}
                      &lt;/span>
                      \{optionLabel(f, c)\}
                    &lt;/button>;
    \})\}
              \}
          ;
  \})\}
        \{sortOptions.length > 1 && &lt;div role="group" aria-label="Sort by" style=&#123;&#123;
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--sf-text-3)',
    whiteSpace: 'nowrap'
  &#125;&#125;>
            &lt;span style=&#123;&#123;
    marginRight: '4px'
  &#125;&#125;>Sort by&lt;/span>
            \{sortOptions.map(o => \{
    const on = sortBy === o;
    return &lt;button key=\{o\} type="button" aria-pressed=\{on\} onClick=\{() => \{
      setSortBy(o);
      sortTables(o);
    &#125;&#125; style=&#123;&#123;
      padding: '6px 10px',
      borderRadius: '8px',
      border: '1px solid ' + (on ? 'var(--sf-accent)' : 'var(--sf-border)'),
      background: 'var(--sf-bg)',
      color: on ? 'var(--sf-text)' : 'var(--sf-text-3)',
      fontSize: '13px',
      cursor: 'pointer'
    &#125;&#125;>
                  \{o.charAt(0).toUpperCase() + o.slice(1)\}
                &lt;/button>;
  \})\}
          \}
        
        &lt;div aria-live="polite" style=&#123;&#123;
    margin: '8px 0 0',
    fontSize: '13px',
    color: 'var(--sf-text-3)',
    minHeight: '1px'
  &#125;&#125;>
          \{q.trim() === '' && !facetActive ? <>\{counts.total\} \{nounText\}</> : counts.shown === 0 ? <>
                \{q.trim() === '' ? 'No ' + nounText + ' match the selected filters.' : facetActive ? 'No ' + nounText + ' match \u201c' + q + '\u201d with the selected filters.' : 'No ' + nounText + ' match \u201c' + q + '\u201d.'\}\{' '\}
                &lt;button type="button" onClick=\{clearAll\} style=&#123;&#123;
    background: 'none',
    border: 'none',
    padding: 0,
    color: 'var(--sf-accent)',
    cursor: 'pointer',
    font: 'inherit',
    textDecoration: 'underline'
  &#125;&#125;>
                  Clear filters
                &lt;/button>
                \{children ? <> \{children\}</> : null\}
              </> : <>
                Showing \{counts.shown\} of \{counts.total\} \{nounText\}
              </>\}
        
      
    </>;
\};

This reference page lists each key Claude Code reads from a settings file, plus the [short group of keys](#global-config-settings) it keeps in `~/.claude.json` instead. To pick a file, or check precedence, start with [Settings files and precedence](https://code.claude.com/docs/en/settings).

&lt;span id="available-settings" />

&lt;span id="scopes" />

&lt;span id="all-settings" />

## 本篇目录

- [Settings index](https://code.claude.com/docs)
- [Model and responses](https://code.claude.com/docs)
- [Permission settings](https://code.claude.com/docs)
- [Sandbox settings](https://code.claude.com/docs)
- [Memory and context](https://code.claude.com/docs)
- [Interface and terminal](https://code.claude.com/docs)
- [Git and attribution](https://code.claude.com/docs)
- [Hooks and automation](https://code.claude.com/docs)
- [Plugins and skills](https://code.claude.com/docs)
- [MCP](https://code.claude.com/docs)
- [Agents, sessions, and worktrees](https://code.claude.com/docs)
- [Remote, desktop, and notifications](https://code.claude.com/docs)
- [Authentication and providers](https://code.claude.com/docs)
- [Updates and versioning](https://code.claude.com/docs)
- [Tools](https://code.claude.com/docs)
- [Privacy and telemetry](https://code.claude.com/docs)
- [Enterprise and managed settings](https://code.claude.com/docs)
- [Global config settings](https://code.claude.com/docs)
- [See also](https://code.claude.com/docs)
