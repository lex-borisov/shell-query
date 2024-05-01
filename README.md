<h1 align="center">Web CLI</h1>

CLI for making web search queries from a shell.

- [Installation](#installation)
- [Usage](#basic-usage)
  - [Keywords](#basic-usage-keywords)
  - [URLs](#basic-usage-urls)
- [Options](#options)
  - [Usage](#options-usage)
  - [Value options](#value-options)
  - [Flag options](#flag-options)
  - [Placement](#options-placement)
- [Built-in Options](#built-in-options)
  - [`browser`](#option-browser)
  - [`profile`](#option-profile)
  - [`engine`](#option-engine)
  - [`query`](#option-query)
  - [`resource`](#option-resource)
  - [`port`](#option-port)
  - [`incognito`](#option-incognito)
  - [`split`](#option-split)
  - [`http`](#option-http)
  - [`peek`](#option-peek)
- [Configuration](#configuration-setup)
  - [Browsers](#browsers-configuration)
  - [Engines](#engines-configuration)
- [Custom Flags](#custom-flags)

# Installation <a name="installation"></a>

Install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-cli</code></pre>

After installing, the `web` command is ready for use without any setup.

```
web hello world
```

&gt; `https://google.com/search?q=hello%20world`

To check the installed version, use the `--version` option:

<pre><code>web <em>--version</em></code></pre>

To get help with command options, use the `--help` option:

<pre><code>web <em>--help</em></code></pre>

# Usage <a name="basic-usage"></a>

To perform basic web queries, provide **_space-separated values_**

<pre><code>web <em>&lt;values&gt;</em></code></pre>

The CLI will then construct 1 or more queries based on the type of values and open them in the new browser tab(s).

There are 2 types of values:

1. Keywords
2. URLs

## Keywords <a name="basic-usage-keywords"></a>

When providing keywords, only 1 web query is created using the values as a search term:

```
web hello world
```

&gt; `https://google.com/search?q=hello%20world`

In the absence of [_options_](#options), the CLI uses the **_default search engine_** to construct the query and opens it in the **_default browser_**:

- After installation, there is a set of initial search engines that you can use (default is Google).
- The operating system's default browser is used to open the web queries.

You can change these defaults and add new engines and browsers by setting up and running a [_config project_](#configuration-setup).

### _Initial search engines_ <a name="initial-search-engines"></a>

| Search Engine |    Option Value     |
| ------------- | :-----------------: |
| Google        |      `google`       |
| DuckDuckGo    | `duckduckgo` `duck` |
| MDN           |        `mdn`        |
| YouTube       |      `youtube`      |
| NPM           |        `npm`        |

The option value can be either supplied to the [`engine`](#option-engine) option or used as a [_custom flag_](#custom-flags).

## URLs <a name="basic-usage-urls"></a>

When providing a URL as a value, the default behavior is to access that URL directly:

```
web github.com
```

&gt; `https://github.com`

If multiple URLs are provided, each URL creates a separate web query:

```
web github.com npmjs.com developer.mozilla.org
```

&gt; `https://github.com`  
&gt; `https://npmjs.com`  
&gt; `https://developer.mozilla.org`

### _Keywords and URLs together_

If both keywords and URLs are provided, then all values are treated as search term keywords:

```
web most starred repos on github.com
```

&gt; `https://google.com/search?q=most%20starred%20repos%20on%20github.com`

# Options <a name="options"></a>

Options give you control over web queries by overriding the CLI's defaults.

## Usage <a name="options-usage"></a>

To use an option in the command, prefix it with a double dash `--`

<pre><code>web <em>--option</em></code></pre>

1-letter options (like an option's aliases, for example) are prefixed by a single dash `-`

<pre><code>web <em>-x</em></code></pre>

If an option requires a value ([_value options_](#value-options)), provide it in one of the following ways:

<pre><code>web <em>--option=value</em></code></pre>
<pre><code>web <em>--option value</em></code></pre>

> **_Note_**  
> The assignment syntax (`--option=value`) is preferred, especially when building larger web queries with many search term keywords. This helps avoid any confusion between what is an option's value and what is an actual keyword.

1-letter options can be combined together with a single dash `-` as long as their combination is valid:

<pre><code>web <em>-xyz</em></code></pre>

which is equivalent to:

<pre><code>web <em>-x</em> <em>-y</em> <em>-z</em></code></pre>

> **_Caution!_**  
> Combining 1-letter aliases of multiple [_value options_](#value-options) will result in invalid queries when such combinations are followed by a value. It is recommended to combine only the [_flag options_](#flag-options), which can be built-in or custom. If you want to add a 1-letter value option, it must be placed at the very end of the combination. If the value option is placed in the middle, the value will not get assigned to it.

## Value options <a name="value-options"></a>

The following are built-in options that require a value:

| Option                         |          Alias          | Description                            |
| ------------------------------ | :---------------------: | -------------------------------------- |
| [`browser`](#option-browser)   | [`b`](#option-browser)  | _Browser app to open_                  |
| [`profile`](#option-profile)   | [`p`](#option-profile)  | _Browser profile to use_               |
| [`engine`](#option-engine)     |  [`e`](#option-engine)  | _Search engine (or website) to query_  |
| [`query`](#option-query)       |  [`q`](#option-query)   | _Engine's query to use for searchhing_ |
| [`resource`](#option-resource) | [`r`](#option-resource) | _Engine's resource to access_          |
| [`port`](#option-port)         |   [`:`](#option-port)   | _Port number to add to the URL_        |

All value options work without any initial configuration but each option's usage can be enhanced by setting up the config. Refer to each option as well as [_engines configuration_](#engines-configuration) and [_browsers configuration_](#browsers-configuration) for more details.

## Flag options <a name="flag-options"></a>

Options that do not require a value are called **_flags_**. The following are built-in flag options:

| Option                           |          Alias           | Description                                       |
| -------------------------------- | :----------------------: | ------------------------------------------------- |
| [`incognito`](#option-incognito) | [`i`](#option-incognito) | _Open in incognito / private mode_                |
| [`split`](#option-split)         |            ❌            | _Split values into separate web queries_          |
| [`http`](#option-http)           |            ❌            | _Use the HTTP (non-secure) protocol_              |
| [`peek`](#option-peek)           |            ❌            | _Display the output without opening browser tabs_ |

> **_Caveat!_**  
> Flag options can be assigned values `true` and `false`. This is because, internally, flags are `boolean`s. Using a flag option in the command automatically sets its value to **_"true"_** but the option will still accept a boolean value that's placed after it (even without the explicit `=` sign). Therefore, make sure to not accidentally assign **_"true"_** or **_"false"_** to a flag if you do not intend it. Doing so will result in your web query missing the keyword **_"true"_** or **_"false"_** from the search term.

With browsers and engines configuration set up, you can also use [_custom flags_](#custom-flags) which are created from the keys and aliases of _browsers_, _browser profiles_, and _engines_ from the generated config file. Custom flags simplify your web queries by being a convenient substitute for value options.

## Placement <a name="options-placement"></a>

Options can be placed anywhere in the command

<pre><code>web <em>--browser=firefox</em> this is <em>--incognito</em> an example <em>--engine=duckduckgo</em> search query</code></pre>

<pre><code>web <em>-b=firefox</em> this is <em>-i</em> an example <em>-e=duckduckgo</em> search query</code></pre>

> **_Note_**  
> Normally, you would place the options where they make sense visually such as at the start or the end of the command. This example just shows you that their placement does not impact the constructed query.

The above command will do the following:

- construct a web query using
  - the keywords **_"this is an example search query"_**
  - the **_DuckDuckGo_** search engine (`--engine=duckduckgo`)
- open the constructed query in a new **_Firefox_** tab (`--browser=firefox`)
- in **_incognito / private mode_** (`--incognito`)

# Built-in Options <a name="built-in-options"></a>

## `--browser`&nbsp;&nbsp;`-b` <a name="option-browser"></a>

Specifies the browser app to open.

✅ Requires a value.  
⚙️ Allows configuration.

### **_Usage_**

<pre><code>web <em>--browser=value</em></code></pre>

`value` is one of the following:

- a browser app name, e.g. `chrome`, `firefox`, `brave`, `edge`, etc.
- a browser's key or alias in the config, like `chrome`, `firefox`, `c`, `f`, or `ff` here:

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  chrome: browser({
    alias: "c",
  }),
  firefox: browser({
    alias: ["f", "ff"],
  }),
}));
```

> **_Note!_**  
> The command will not prevent you from specifying a value that refers to an invalid browser or to another non-browser application on your machine. As far as the program is concerned - any value provided to the `browser` option is a possible browser app, so it will attempt to open it.

#### **_Multiple browsers_**

You can specify multiple browsers:

<pre><code>web <em>--browser=value</em> <em>--browser=value</em> ...</code></pre>

### **_Configuration_**

Setting up [_browsers configuration_](#browsers-configuration) allows using

- browser aliases as the option's value
- browser keys and aliases as custom flags

## `--profile`&nbsp;&nbsp;`-p` <a name="option-profile"></a>

Specifies what browser profile to use when opening a new browser tab.

✅ Requires a value.  
⚙️ Allows configuration.

The option works only if the browser application supports profiles functionality. Otherwise, it will have no effect on the opened web query.

### **_Usage_**

This option depends on the `browser` option or generated config.

- If the `browser` option is not provided, the CLI will use the config's **_default browser_** (see how it is determined in [_browsers configuration_](#browsers-configuration)).
- If the `browser` option is not provided and there is no browser config, the query will not be opened.

<pre><code>web <em>--profile=value</em></code></pre>

`value` is one of the following:

- a profile directory name, e.g.:

<pre><code>web <em>--profile="Profile 1"</em></code></pre>

> For this scenario to work, make sure that you either provide the `--browser` option or create config, like here:

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  chrome: browser(),
}));
```

- a property key in the `profiles` object of the browser config, like `dev` or `personal`:

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  chrome: browser({
    profiles: {
      dev: "Profile 1",
      personal: "Profile 2",
    },
  }),
}));
```

- a value of a profile's `alias` property, like `d`, `main`, `p`, or `second`:

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  chrome: browser({
    profiles: {
      dev: {
        directory: "Profile 1",
        alias: ["d", "main"],
      },
      personal: {
        directory: "Profile 2",
        alias: ["p", "second"],
      },
    },
  }),
}));
```

#### **_Multiple profiles_**

You can specify multiple profiles:

<pre><code>web <em>--profile=value</em> <em>--profile=value</em> ...</code></pre>

### **_Configuration_**

Setting up [_browsers configuration_](#browsers-configuration) allows using

- profile keys and aliases as the option's value
- profile keys as custom flags

## `--engine`&nbsp;&nbsp;`-e` <a name="option-engine"></a>

Specifies what search engine or website to query.

✅ Requires a value.  
⚙️ Allows configuration.

### **_Usage_**

<pre><code>web <em>--engine=value</em></code></pre>

`value` refers to the engine's key or alias in the **_engines_** config or a URL.

For example:

<pre><code>web @lexjs/web-cli <em>--engine=npm</em></code></pre>

&gt; `https://npmjs.com/search?q=@lexjs/web-cli`

When supplying URL values to the command, this option overrides the default behavior of accessing the URLs directly. Instead, they are treated as search term keywords for the provided engine. For example:

<pre><code>web github.com <em>--engine=google</em></code></pre>

&gt; `https://google.com/search?q=github.com`

The option also accepts an arbitrary URL value:

<pre><code>web @lexjs/web-cli <em>--engine=npmjs.com/search?q=</em></code></pre>

&gt; `https://npmjs.com/search?q=@lexjs/web-cli`

> **_Note!_**  
> Non-URL values are not allowed.

When using the option with an arbitrary URL, it behaves in the same way as any other engine from the config, meaning that you can use other options with it, such as `--resource`, `--split`, or `--http`.

Also note that since a URL value is a simple string and not an object that could better define an engine (for example, by having a `query` property), the program will simply append it with whatever command values are supplied. If the URL has no query string that ends with an equals sign (`=`), the values will be added after a forward-slash (`/`):

<pre><code>web hello world <em>--engine=example.com</em></code></pre>

&gt; `https://example.com/hello%20world`

### **_Configuration_**

To define more engines and websites than the app defaults, add them to [_engines configuration_](#engines-configuration).

## `--query`&nbsp;&nbsp;`-q` <a name="option-query"></a>

TODO

## `--resource`&nbsp;&nbsp;`-r` <a name="option-resource"></a>

Overrides the default behavior of _querying_ a search engine by specifying the engine's route to access directly.

✅ Requires a value.  
⭕ Configuration is optional.

### **_Usage_**

The option must be used together with the `engine` option. If the engine is NOT supplied, the validation will fail and the web query will not be performed.

#### 1. Without command values

<pre><code>web <em>--resource=value</em></code></pre>

`value` refers to the engine's route to access.

For example, the following command adds "teapot" to the engine's URL to access the route directly instead of searching it as a keyword.

<pre><code>web <em>--engine=google</em> <em>--resource=teapot</em></code></pre>

&gt; `https://google.com/teapot`

#### 2. With command values

When supplying values to the command, each value is used in a separate web query as a URL path segment after the provided route.

For example, the following creates 3 distinct web queries:

<pre><code>web <em>--engine=npm</em> <em>--resource=package</em> lodash axios express</code></pre>

&gt; `https://npmjs.com/package/lodash`  
&gt; `https://npmjs.com/package/axios`  
&gt; `https://npmjs.com/package/express`

### **_Configuration_**

The option's value can be a key from an engine's `routes` property in [_engines configuration_](#engines-configuration). When this config property is set up, the program will search it first to find the provided value among the property's keys. If it is not there, then the supplied value itself is used to build the web query.

Setting up the `routes` property can be useful when frequently accessing an engine's route that can be long to type or hard to remember the full path of.

For example, with the following GitHub engine config

```json
"github": {
  "name": "GitHub",
  "url": "github.com",
  "query": "search?q=",
  "routes": {
    "repos": "username?tab=repositories",
    "stars": "username?tab=stars"
  }
}
```

we can use `repos` and `stars` as a value of the `route` option:

<pre><code>web <em>--engine=github</em> <em>--resource=repos</em></code></pre>

&gt; `https://github.com/username?tab=repositories`

## `--port`&nbsp;&nbsp;`-:` <a name="option-port"></a>

Adds the provided port number to the URL.

✅ Requires a number value.  
❌ No configuration.

### **_Usage_**

<pre><code>web example.com <em>--port=3000</em></code></pre>

&gt; `https://example.com:3000/`

If multiple ports are supplied, each one will create a separate query:

<pre><code>web example.com <em>-: 3000 -: 5000</em></code></pre>

&gt; `https://example.com:3000/`  
&gt; `https://example.com:5000/`

The program recognizes if an engine or a URL already includes a port and checks if it matches the option's value when building the final list of URLs:

<pre><code>web example.com:3000/api/users <em>-: 3000 -: 5000</em></code></pre>

&gt; `https://example.com:3000/api/users`  
&gt; `https://example.com:5000/api/users`

## `--incognito`&nbsp;&nbsp;`-i` <a name="option-incognito"></a>

Opens web queries in a private / incognito mode.

🚩 Flag option - no value is required.  
❌ No configuration.

### **_Usage_**

<pre><code>web <em>--incognito</em></code></pre>

## `--split` <a name="option-split"></a>

Splits provided values into separate web queries.

🚩 Flag option - no value is required.  
❌ No configuration.

### **_Usage_**

<pre><code>web <em>--engine=mdn</em> Object Symbol class <em>--split</em></code></pre>

&gt; `https://developer.mozilla.org/search?q=Object`  
&gt; `https://developer.mozilla.org/search?q=Symbol`  
&gt; `https://developer.mozilla.org/search?q=class`

## `--http` <a name="option-http"></a>

Uses the HTTP (non-secure) protocol when constructing the web queries.

🚩 Flag option - no value is required.  
❌ No configuration.

## `--peek` <a name="option-peek"></a>

Prevents opening browser tabs and only displays the output.

🚩 Flag option - no value is required.  
❌ No configuration.

### **_Usage_**

<pre><code>web [values] [options] <em>--peek</em></code></pre>

# Configuration <a name="configuration-setup"></a>

To see where the config files are stored on your machine, use the `config` option without a value.

<pre><code>web <em>--config</em></code></pre>

&gt; `path/to/config/files`

To open a desired config file, use the `config` option with the `browsers` or `engines` value:

<pre><code>web <em>--config=browsers</em></code></pre>

<pre><code>web <em>--config=engines</em></code></pre>

Both browsers and engines configurations are in the JSON format, so the files will open in the OS default application for editing JSON.

> **_Note!_**  
> When using this option with a value **AND** the corresponding config file does not exist, the program will create it. In the case of engines config, the newly created file will be populated with [initial search engines](#initial-search-engines). You have the option to change these initial engines (e.g. adding aliases or deleting an engine entirely from the config file).

The option can be used more than once (to open both files at the same time, for example):

<pre><code>web <em>--config=browsers</em> <em>--config=engines</em></code></pre>

Optionally, you can supply 1 or more space-separated apps that should open the config files:

<pre><code>web <em>--config=browsers</em> code</code></pre>

<pre><code>web <em>--config=engines</em> notepad++</code></pre>

> The apps should be installed on your machine.

Modifying each config requires you to follow their accepted data structures explained below.

## Browsers <a name="browsers-configuration"></a>

Browsers configuration is a JSON file containing an object with browsers data. The following describes a browser object inside the JSON config file.

```json
{
  "<browser_key>": {
    "isDefault": "boolean",
    "alias": "string_or_array_of_strings",
    "profiles": {
      "<profile_key>": {
        "directory": "string",
        "isDefault": "boolean",
        "alias": "string_or_array_of_strings"
      }
    }
  }
}
```

> You can add as many browser objects to the config file as you have browsers on your machine. Each browser object is separated by a comma, and trailing commas are not allowed in a JSON file.
>
> **_Note!_**  
> Setting up browsers configuration does not limit you to using only the browsers in the config. You can still supply other browser values to the `browser` option, but using custom flags is only available after setting up the config.

- `<browser_key>`: a string representing the browser app that is supplied to the `browser` option.
- `isDefault`: _optional_ - accepts a boolean value indicating if the browser should be used as default. **_If not present, then the first browser object in the config file is used as default_**. If multiple browser objects have this property (which should be avoided), then the first one with it will be used as default.
- `alias`: _optional_ - accepts a string or array of strings that can be used instead of `<browser_key>`.
- `profiles`: _optional_ - accepts an object that represents browser profiles:
  - `<profile_key>`: a string representing the browser profile that is supplied to the `profile` option.
  - `directory`: _required_ - accepts a string representing the profile's exact directory name (NOT the full path, just the folder name). Different operating systems have different ways of storing user's browser profile data - please search how to find such folder on your OS, if you are not sure.
  - `isDefault`: _optional_ - accepts a boolean value indicating if the browser's profile should be used as default. **_If not present, then the first profile object within the browser is used as default_**. If multiple profile objects inside the browser have this property (which should be avoided), then the first one with it will be used as default.
  - `alias`: _optional_ - accepts a string or array of strings that can be used instead of `<profile_key>`.

### _TypeScript representation of the above JSON data_

```typescript
interface Browsers {
  [browserKey: string]: {
    isDefault?: boolean;
    alias?: string | string[];
    profiles?: Profiles;
  };
}

interface Profiles {
  [profileKey: string]: {
    directory: string;
    isDefault?: boolean;
    alias?: string | string[];
  };
}
```

### _Example browsers config_

```json
{
  "chrome": {
    "alias": "c",
    "profiles": {
      "dev": {
        "directory": "Profile 1",
        "alias": "d"
      },
      "personal": {
        "directory": "Profile 2",
        "alias": "p"
      }
    }
  },
  "edge": {
    "alias": "e",
    "profiles": {
      "dev": {
        "directory": "Profile 1",
        "alias": "d"
      },
      "school": {
        "directory": "Profile 2",
        "alias": ["s", "study"]
      }
    }
  },
  "firefox": {
    "alias": ["f", "ff", "fox"]
  }
}
```

## Engines <a name="engines-configuration"></a>

Engines configuration is a JSON file containing an object with engines data. The following describes an engine object inside the JSON config file.

```json
{
  "<engine_key>": {
    "name": "string",
    "url": "string",
    "query": "string",
    "delimiter": "string",
    "isDefault": "boolean",
    "alias": "string_or_array_of_strings",
    "routes": {
      "<route_key>": "string"
    }
  }
}
```

> You can add as many engine objects to the config file as you'd like to use. Each engine object is separated by a comma, and trailing commas are not allowed in a JSON file.

- `<engine_key>`: a string representing the search engine or website that is supplied to the `engine` option.
- `name`: _required_ - accepts a string representing the name of the search engine / website.
- `url`: _required_ - accepts a string of the engine's base URL **_without the protocol_** and **_without the query string_**. For example, in a URL like this: `https://google.com/search?q=whatever` - supply only `google.com`.
- `query`: _optional_ - accepts a string representing the search engine's query string. Following the example above: `https://google.com/search?q=whatever` - the query string is `search?q=` which sits between the engine's base url and the search keywords. To find an engine's query string, go to its URL then type anything in its search box and hit enter. You will find that most websites and search engines have their own query string that you can grab. If not, then that engine cannot be used for searching with the query string.
- `delimiter`: _optional_ - accepts a string (normally a single character) representing the delimiter between search term keywords. Sometimes you will find that search engines modify the search query URL by replacing the space with another character, such as a `+` sign. If you find that the engine has a different delimiter, then provide it here. **_The default delimiter is the space character_**.
- `isDefault`: _optional_ - accepts a boolean value indicating if the engine should be used as default. **_If not present, then the first engine object in the config file is used as default_**. If multiple engine objects have this property (which should be avoided), then the first one with it will be used as default.
- `alias`: _optional_ - accepts a string or array of strings that can be used instead of `<engine_key>`.
- `routes`: _optional_ - accepts an object that represents engine routes:
  - `<route_key>`: a string representing the route that is supplied to the `route` option. It accepts a string value of the route's actual segment of the URL. Think of the `<route_key>` as an alias for the route. For example, in a routes key-value pair like this: `"repos": "username?tab=repositories"` - the `repos` is what's provided to the `route` option, while the `username?tab=repositories` is what's actually used to build the web query URL.

### _TypeScript representation of the above JSON data_

```typescript
interface Engines {
  [engineKey: string]: {
    name: string;
    url: string;
    query?: string;
    delimiter?: string;
    isDefault?: boolean;
    alias?: string | string[];
    routes?: Routes;
  };
}

interface Routes {
  [routeKey: string]: string;
}
```

### _Example engines config_

```json
{
  "google": {
    "name": "Google",
    "url": "google.com",
    "query": "search?q="
  },
  "duckduckgo": {
    "name": "DuckDuckGo",
    "url": "duckduckgo.com",
    "query": "?q=",
    "delimiter": "+",
    "alias": ["duck", "ddg"]
  },
  "youtube": {
    "name": "YouTube",
    "url": "youtube.com",
    "query": "results?search_query=",
    "delimiter": "+",
    "alias": ["y", "yt"]
  },
  "mdn": {
    "name": "MDN",
    "url": "developer.mozilla.org",
    "query": "search?q=",
    "alias": "m"
  },
  "github": {
    "name": "Github",
    "url": "github.com",
    "query": "search?q=",
    "alias": ["git", "gh"],
    "routes": {
      "repos": "username?tab=repositories",
      "stars": "username?tab=stars"
    }
  }
}
```

# Custom Flags <a name="custom-flags"></a>

When browsers and engines config files are set up, certain keys and alias values automatically become _flags_. You can use these custom flags as substitutes for `browser`, `profile`, and `engine` options.

For example, the following command with value options

<pre><code>web <em>--browser=chrome --profile=dev --engine=mdn</em></code></pre>

can be re-written using custom flags:

<pre><code>web <em>--chrome --dev --mdn</em></code></pre>

> If a custom flag conflicts with a [_query option_](#query-options) or its alias, the query option takes precedence.

## How custom flags are created

The following config items are used to create custom flags:

|         | keys | alias values | 1-letter alias values |
| ------- | :--: | :----------: | :-------------------: |
| browser |  ✅  |      ✅      |          ✅           |
| profile |  ✅  |      ✅      |          ❌           |
| engine  |  ✅  |      ✅      |          ✅           |

### _Browsers config_

Let's say we have the following browsers config:

```json
{
  "chrome": {
    "alias": "c",
    "profiles": {
      "dev": {
        "directory": "Profile 1",
        "alias": "d"
      },
      "personal": {
        "directory": "Profile 2",
        "alias": "p"
      }
    }
  },
  "edge": {
    "alias": "e",
    "profiles": {
      "dev": {
        "directory": "Profile 1",
        "alias": "d"
      },
      "school": {
        "directory": "Profile 2",
        "alias": ["s", "study"]
      }
    }
  },
  "firefox": {
    "alias": ["f", "ff", "fox"]
  }
}
```

These items from the above config can be used as custom flags:

|         |           keys            |    alias values    |
| ------- | :-----------------------: | :----------------: |
| browser | `chrome` `edge` `firefox` | `c` `f` `ff` `fox` |
| profile | `dev` `personal` `school` |      `study`       |

💡 Notice that the browser alias `e` cannot be used as a custom flag because it conflicts with the alias of the `engine` option.

### _Engines config_

Here's an example of an engines config:

```json
{
  "google": {
    "name": "Google",
    "url": "google.com",
    "query": "search?q=",
    "alias": "g"
  },
  "duckduckgo": {
    "name": "DuckDuckGo",
    "url": "duckduckgo.com",
    "query": "?q=",
    "delimiter": "+",
    "alias": ["duck", "ddg"]
  },
  "youtube": {
    "name": "YouTube",
    "url": "youtube.com",
    "query": "results?search_query=",
    "delimiter": "+",
    "alias": ["y", "yt"]
  },
  "mdn": {
    "name": "MDN",
    "url": "developer.mozilla.org",
    "query": "search?q=",
    "alias": "m"
  },
  "reddit": {
    "name": "Reddit",
    "url": "reddit.com",
    "query": "search?q=",
    "alias": "r"
  }
}
```

The following items from the above config can be used as custom flags:

|                 keys                  |         alias values          |
| :-----------------------------------: | :---------------------------: |
| `google` `duckduckgo` `youtube` `mdn` | `g` `duck` `ddg` `y` `yt` `m` |

💡 Notice that the engine alias `r` cannot be used as a custom flag because it conflicts with the alias of the `route` option.
