// https://scrapbox.io/scrapboxlab/api%2Fpages%2F:projectname%2F:pagetitle
// https://github.com/fabian-hiller/valibot

import {
  array,
  minValue,
  nullable,
  number,
  object,
  omit,
  Output,
  string,
} from "https://deno.land/x/valibot@v0.19.0/mod.ts";

export const line = object({
  text: string(),
});

// https://scrapbox.io/api/pages/:project-name/:title
export const page = object({
  title: string(),
  created: number([minValue(0)]),
  updated: number([minValue(0)]),
  image: nullable(string()),
  lines: array(line),
});

// https://scrapbox.io/api/pages/:project-name
export const pages = array(
  object({
    count: number(),
    limit: number(),
    pages: array(omit(page, ["lines"])),
  })
);

// foo
//  bar
//   xxx
//   yyy
//  baz

[
  {
    type: "plain",
    text: "foo",
    children: [
      {
        text: "bar",
        children: [{ text: "xxx" }, { text: "yyy" }],
      },
      {
        text: "baz",
      },
    ],
  },
  { type: "code", path: "script.ts", children: [] },
  { type: "table" },
  { type: "link" },
];

// export const body =

type OutputPage = Output<typeof page>;
type OutputPages = Output<typeof pages>;
