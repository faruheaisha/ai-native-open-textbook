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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "b6109ff8bf548ca6523a0155cdc1a5380bcad6aea955b21e145d87c5dc0e8da3"
contentMode: "local-full"
zh: ""
---

## Anatomy of a function pipeline

Function pipelines are built as a series of elements that work together to
create your query. The most important part of a pipeline is a custom data type
called a `timevector`. The other elements then work on the `timevector` to build
your query, using a custom operator to define the order in which the elements
are run.

A `timevector` is a collection of time,value pairs with a defined start and end
time, that could something like this:

&lt;img class="main-content__illustration"
width=\{1375\} height=\{944\}
src="https://assets.timescale.com/docs/images/timevector.webp"
alt="An example timevector"/>

Your entire database might have time,value pairs that go well into the past and
continue into the future, but the `timevector` has a defined start and end time
within that dataset, which could look something like this:

&lt;img class="main-content__illustration"
width=\{1375\} height=\{944\}
src="https://assets.timescale.com/docs/images/timeseries_vector.webp"
alt="An example of a timevector within a larger dataset"/>

To construct a `timevector` from your data, use a custom aggregate and pass
in the columns to become the time,value pairs. It uses a `WHERE` clause to
define the limits of the subset, and a `GROUP BY` clause to provide identifying
information about the time-series. For example, to construct a `timevector` from
a dataset that contains temperatures, the SQL looks like this:

Function pipelines use a single custom operator of `->`. This operator is used
to apply and compose multiple functions. The `->` operator takes the inputs on
the left of the operator, and applies the operation on the right of the
operator. To put it more plainly, you can think of it as "do the next thing."

A typical function pipeline could look something like this:

While it might look at first glance as though `timevector(ts, val)` operation is
an argument to `sort()`, in a pipeline these are all regular function calls.
Each of the calls can only operate on the things in their own parentheses, and
don't know about anything to the left of them in the statement.

Each of the functions in a pipeline returns a custom type that describes the
function and its arguments, these are all pipeline elements. The `->` operator
performs one of two different types of actions depending on the types on its
right and left sides:

*   Applies a pipeline element to the left hand argument: performing the
    function described by the pipeline element on the incoming data type directly.
*   Compose pipeline elements into a combined element that can be applied at
    some point in the future. This is an optimization that allows you to nest
    elements to reduce the number of passes that are required.

The operator determines the action to perform based on its left and right
arguments.

### Pipeline elements

There are two main types of pipeline elements:

*   Transforms change the contents of the `timevector`, returning
    the updated vector.
*   Finalizers finish the pipeline and output the resulting data.

Transform elements take in a `timevector` and produce a `timevector`. They are
the simplest element to compose, because they produce the same type.
For example:

Finalizer elements end the `timevector` portion of a pipeline. They can produce
an output in a specified format. or they can produce an aggregate of the
`timevector`.

For example, a finalizer element that produces an output:

Or a finalizer element that produces an aggregate:

The third type of pipeline elements are aggregate accessors and mutators. These
work on a `timevector` in a pipeline, but they also work in regular aggregate
queries. An example of using these in a pipeline:
