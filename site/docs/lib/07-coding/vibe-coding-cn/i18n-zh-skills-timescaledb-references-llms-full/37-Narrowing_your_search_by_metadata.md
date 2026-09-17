---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "7fe246a0cf52f28753e2e0c3e177f11253fbf9c12aa8dc992388c73a4c86ba8f"
contentMode: "local-full"
zh: ""
---

#### Narrowing your search by metadata

There are two main ways to filter results by metadata:
- `filters` for equality matches on metadata.
- `predicates` for complex conditions on metadata.

Filters are more limited in what they can express, but are also more performant. You should use filters if your use case allows it.

##### Using filters for equality matches

You could specify a match on the metadata as a dictionary where all keys
have to match the provided values (keys not in the filter are
unconstrained):

``` python
vec.search([1.0, 9.0], limit=1, filter={"action": "sit"})
```

    [[UUID('7487af14-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 1, 'action': 'sit', 'animal': 'fox'\},
      'the brown fox',
      array([1. , 1.3], dtype=float32),
      0.14489260377438218]]

You can also specify a list of filter dictionaries, where an item is
returned if it matches any dict:

``` python
vec.search([1.0, 9.0], limit=2, filter=[{"action": "jump"}, {"animal": "fox"}])
```

    [[UUID('7487af96-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456],
     [UUID('7487af14-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 1, 'action': 'sit', 'animal': 'fox'\},
      'the brown fox',
      array([1. , 1.3], dtype=float32),
      0.14489260377438218]]

##### Using predicates for more advanced filtering on metadata

Predicates allow for more complex search conditions. For example, you
could use greater than and less than conditions on numeric values.

``` python
vec.search([1.0, 9.0], limit=2, predicates=client.Predicates("times", ">", 1))
```

    [[UUID('7487af96-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456]]

`Predicates`
objects are defined by the name of the metadata key, an operator, and a value.

The supported operators are: `==`, `!=`, `<`, `<=`, `>`, `>=`

The type of the values determines the type of comparison to perform. For
example, passing in `"Sam"` (a string) performs a string comparison while
a `10` (an int) performs an integer comparison, and a `10.0`
(float) performs a float comparison. It is important to note that using a
value of `"10"` performs a string comparison as well so it's important to
use the right type. Supported Python types are: `str`, `int`, and
`float`.

One more example with a string comparison:

``` python
vec.search([1.0, 9.0], limit=2, predicates=client.Predicates("action", "==", "jump"))
```

    [[UUID('7487af96-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456]]

The real power of predicates is that they can also be combined using the
`&` operator (for combining predicates with `AND` semantics) and `|`(for
combining using OR semantic). So you can do:

``` python
vec.search([1.0, 9.0], limit=2, predicates=client.Predicates("action", "==", "jump") & client.Predicates("times", ">", 1))
```

    [[UUID('7487af96-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456]]

Just for sanity, the next example shows a case where no results are returned because
of predicates:

``` python
vec.search([1.0, 9.0], limit=2, predicates=client.Predicates("action", "==", "jump") & client.Predicates("times", "==", 1))
```

    []

And one more example where the predicates are defined as a variable
and use grouping with parenthesis:

``` python
my_predicates = client.Predicates("action", "==", "jump") & (client.Predicates("times", "==", 1) | client.Predicates("times", ">", 1))
vec.search([1.0, 9.0], limit=2, predicates=my_predicates)
```

    [[UUID('7487af96-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456]]

There is also semantic sugar for combining many predicates with `AND`
semantics. You can pass in multiple 3-tuples to
`Predicates`:

``` python
vec.search([1.0, 9.0], limit=2, predicates=client.Predicates(("action", "==", "jump"), ("times", ">", 10)))
```

    [[UUID('7487af96-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456]]
