/**
 * This file is part of OpenMediaVault.
 *
 * @license   https://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2025 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
import { MatFormDatatableAction } from '~/app/core/components/intuition/material/mat-form-datatable/mat-form-datatable.component';
import { FormFieldName } from '~/app/core/components/intuition/models/form.type';
import { Constraint } from '~/app/shared/models/constraint.type';
import { DataStore } from '~/app/shared/models/data-store.type';
import { DatatableColumn } from '~/app/shared/models/datatable-column.type';
import { Sorter } from '~/app/shared/models/sorter.type';

export type FormFieldConfig = {
  // The following field controls are supported:
  // .--------------------------------------------------------------------.
  // | Type        | Description                                          |
  // |-------------|------------------------------------------------------|
  // | card        | A card that renders tokenized strings. Note, fields  |
  // |             | that are used here must exist in the form; use the   |
  // |             | `hidden` type if you do not want to display them in  |
  // |             | the form.                                            |
  // | confObjUuid | This is a hidden field that contains a UUID. By      |
  // |             | default it is set to the UUID that tells the backend |
  // |             | that it should handle the data to create a new       |
  // |             | database configuration object.                       |
  // | hidden      | A hidden form field.                                 |
  // | paragraph   | Displays a title.                                    |
  // | divider     | Displays a horizontal line and an optional title.    |
  // | hint        | Displays a text and an icon.                         |
  // | codeEditor  | A code editor width support for different languages  |
  // |             | and syntax highlighting.                             |
  // | tagInput    | Displays a list of tags. The value is stored as a    |
  // |             | string. The separator defaults to a comma.           |
  // | ...         | ...                                                  |
  // | container   | Align child fields in horizontal order.              |
  // '--------------------------------------------------------------------'
  type:
    | 'card'
    | 'confObjUuid'
    | 'hidden'
    | 'divider'
    | 'paragraph'
    | 'button'
    | 'iconButton'
    | 'textInput'
    | 'folderBrowser'
    | 'numberInput'
    | 'binaryUnitInput'
    | 'checkbox'
    | 'textarea'
    | 'fileInput'
    | 'select'
    | 'sharedFolderSelect'
    | 'sshCertSelect'
    | 'sslCertSelect'
    | 'passwordInput'
    | 'datePicker'
    | 'datatable'
    | 'slider'
    | 'container'
    | 'hint'
    | 'codeEditor'
    | 'tagInput';
  name?: FormFieldName;
  label?: string;
  placeholder?: string;
  tooltip?: string;
  hint?: string;
  value?: any;
  readonly?: boolean;
  // Disable the field.
  // Use a tokenized string to be able to mark the field as disabled
  // dynamically based on its evaluation result on form initialization.
  // The special token `_routeConfig` can be to access the components
  // route configuration. Make sure the token will be evaluated to a
  // boolean value.
  //
  // Example:
  // { disabled: '{{ _routeConfig.data.editing | toboolean }}' }
  // The component's route configuration:
  // {
  //   path: 'edit/:name',
  //   component: UserFormPageComponent,
  //   data: {
  //     title: gettext('Edit'),
  //     editing: true,
  //     notificationTitle: gettext('Updated user "{{ name }}".')
  //   }
  // }
  disabled?: boolean | string;
  // Modify the form field depending on a specified constraint. The
  // constraint must be truthy to apply.
  modifiers?: Array<FormFieldModifier>;
  autofocus?: boolean;
  icon?: string;
  submitValue?: boolean;

  // The event name for control to update upon. Defaults to `change`.
  updateOn?: 'change' | 'blur';
  // The validators to ensure the form field content is
  // in a valid state.
  validators?: {
    // Mark the field as required.
    // Use a tokenized string to be able to mark the field as required
    // dynamically based on its evaluation result. The special token
    // `_routeConfig` can be to access the components route configuration.
    // Make sure the token will be evaluated to a boolean value.
    required?: boolean | string;
    // When the constraint succeeds and the control has
    // an empty value, then the 'required' error is set.
    requiredIf?: Constraint;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    email?: boolean;
    custom?: Array<FormFieldConstraintValidator>;
    pattern?: {
      // The regular expression, e.g. '^\s+$'.
      // Note, if the value to be compared is an array, then it will
      // be converted automatically into a comma separated string.
      pattern: string;
      // The error data; normally the error message.
      errorData?: any;
    };
    patternType?:
      | 'userName'
      | 'groupName'
      | 'shareName'
      | 'email'
      | 'macAddress'
      | 'ip'
      | 'ipv4'
      | 'ipv6'
      | 'ipList'
      | 'ipNetCidr'
      | 'hostName'
      | 'hostNameIpNetCidr'
      | 'hostNameIpNetCidrList'
      | 'domainName'
      | 'domainNameList'
      | 'domainNameIp'
      | 'domainNameIpList'
      | 'netbiosName'
      | 'port'
      | 'time'
      | 'numeric'
      | 'decimal'
      | 'integer' // deprecated
      | 'float' // deprecated
      | 'sshPubKey'
      | 'sshPubKeyRfc4716'
      | 'sshPubKeyOpenSsh'
      | 'pgpPubKey'
      | 'netmask'
      | 'wordChars'
      | 'binaryUnit';
  };

  // --- textarea | textInput | fileInput | folderBrowser | password ---
  // Defaults to 'off'.
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize
  autocapitalize?: 'none' | 'sentences' | 'words' | 'characters';

  // --- container ---
  fields?: Array<FormFieldConfig>;

  // --- button | card | hint ---
  text?: string;

  // --- button | iconButton ---
  click?: () => void;
  request?: {
    // The name of the RPC service.
    service: string;
    // The name of the RPC.
    method: string;
    // The RPC parameters. The parameters will be formatted using
    // the values from the parent form.
    params?: Record<string, any>;
    // Set `true` if the RPC is a background task.
    task?: boolean;
    // If a message is defined, then the UI will be blocked and
    // the message is displayed while the request is running.
    progressMessage?: string;
    // Display a notification when the request was successful.
    // The following tokens are supported:
    // - _response: The response of the RPC request.
    // - _editing: Boolean value whether the form is in editing mode.
    // - _session: Session information, e.g. `username` or `permissions`.
    // - _routeConfig: The current route configuration.
    // - _routeParams: The route parameters.
    // - _routeQueryParams: The route query parameters.
    // - _routeUrlSegments: The URL segments.
    // Example:
    // "{{ _response['foo'] }}"
    successNotification?: string;
    // Copy the specified template to the clipboard.
    // The following tokens are supported:
    // - _response: The response of the RPC request.
    // - _editing: Boolean value whether the form is in editing mode.
    // - _session: Session information, e.g. `username` or `permissions`.
    // - _routeConfig: The current route configuration.
    // - _routeParams: The route parameters.
    // - _routeQueryParams: The route query parameters.
    // - _routeUrlSegments: The URL segments.
    // Example:
    // "{{ _response['bar'] }}"
    successCopyToClipboard?: string;
    // Navigate to this URL when the request was successful.
    // The URL will be formatted using the values from the parent
    // form.
    // The following tokens are supported:
    // - _response: The response of the RPC request.
    // - _editing: Boolean value whether the form is in editing mode.
    // - _session: Session information, e.g. `username` or `permissions`.
    // - _routeConfig: The current route configuration.
    // - _routeParams: The route parameters.
    // - _routeQueryParams: The route query parameters.
    // - _routeUrlSegments: The URL segments.
    // Example:
    // /foo/bar/{{ xyz }}/{{ _response['baz'] }}
    // where `xyz` will be replaced by the value of the form field
    // named `xyz` and `_response['baz']` by the property `baz` of
    // the map/object returned by the RPC.
    // Example:
    // /externalRedirect/{{ _response['url'] }}
    // Redirect to an external URL. The URL must not be escaped,
    // this will be done automatically.
    successUrl?: string;
  };
  // The URL will be formatted using the parent form field values
  // and the following tokens:
  // - _editing: Boolean value whether the form is in editing mode.
  // - _session: Session information, e.g. `username` or `permissions`.
  // - _routeConfig: The current route configuration.
  // - _routeParams: The route parameters.
  // - _routeQueryParams: The route query parameters.
  // - _routeUrlSegments: The URL segments.
  url?: string;

  // --- folderBrowser ---
  dirType?: 'sharedfolder' | 'mntent';
  // The name of the field that contains the UUID of the
  // shared folder or mount point configuration object.
  dirRefIdField?: FormFieldName;
  // Set to `true` to show the path of the database object
  // specified with `dirType` and `dirRefIdField`.
  // Defaults to `false`.
  dirVisible?: boolean;

  // --- numberInput | slider ---
  step?: number;

  // --- numberInput | password | textInput | binaryUnitInput ---
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete.
  autocomplete?: string;
  // Note, this button is only visible if the browser supports
  // that. The following requirements must be met:
  // - The HTTPS protocol is used. localhost is also supported.
  // - The site is not embedded in an iFrame.
  hasCopyToClipboardButton?: boolean;

  // --- binaryUnitInput ---
  // The default unit used when the value does not contain a unit.
  // Defaults to bytes (`B`).
  defaultUnit?: 'B' | 'KiB' | 'MiB' | 'GiB' | 'TiB' | 'PiB' | 'EiB' | 'ZiB' | 'YiB';
  // The number of digits after the decimal point.
  // Defaults to `0`.
  fractionDigits?: number;

  // --- textarea | fileInput ---
  cols?: number;
  // Defaults to 4.
  rows?: number;
  // Defaults to 'soft'.
  wrap?: 'hard' | 'soft' | 'off';

  // --- textarea | textInput | fileInput | folderBrowser ---
  // Use a monospace font.
  monospace?: boolean;

  // --- codeEditor ---
  lineNumbers?: boolean;
  language?: 'json' | 'python' | 'shell' | 'xml' | 'yaml';

  // --- fileInput ---
  // Takes a comma-separated list of one or more file types, or
  // unique file type specifiers, describing which file types to
  // allow.
  accept?: string;
  // Remove whitespace from both ends of the file content after
  // loading, this includes space, tab, no-break space and all the
  // line terminator characters (e.g. LF, CR).
  // Defaults to `true` if the `rows` property is set to 1,
  // otherwise `false`.
  trim?: boolean;

  // --- select | sharedFolderSelect | sshCertSelect | sslCertSelect | textInput ---
  // The name of the property to display the option value.
  // Defaults to `value`.
  valueField?: string;
  // The name of the property to display the option text.
  // Defaults to `text`.
  textField?: string;
  store?: DataStore;

  // --- select ---
  multiple?: boolean;
  // Add an empty option to be able to clear the selection.
  // Defaults to `false`.
  hasEmptyOption?: boolean;
  // The text displayed in the option with the empty value.
  // Defaults to `None`.
  emptyOptionText?: string;
  // Internal only.
  selectionChange?: (value: any) => void;

  // --- sharedFolderSelect | sshCertSelect | sslCertSelect ---
  hasCreateButton?: boolean;

  // --- divider | paragraph ---
  title?: string;

  // --- datatable ---
  columns?: Array<DatatableColumn>;
  columnMode?: 'standard' | 'flex' | 'force';
  hasActionBar?: boolean;
  hasSearchField?: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
  selectionType?: 'none' | 'single' | 'multi';
  limit?: number;
  sorters?: Array<Sorter>;
  sortType?: 'single' | 'multi';
  actions?: Array<MatFormDatatableAction>;
  // Specifies the type of the array items. Defaults to `object`.
  valueType?: 'string' | 'integer' | 'number' | 'object';

  // --- hint ---
  hintType?: 'info' | 'warning' | 'tip';
  dismissible?: boolean;

  // --- datatable | hint ---
  stateId?: string;

  // --- tagInput ---
  separator?: string;

  // --- textInput ---
  // Display a dropdown box with suggestions. This requires
  // the `store` property to be set. Defaults to `false`.
  suggestions?: boolean;
};

export type FormFieldConstraintValidator = {
  // When the constraint is falsy, then the specified
  // error code is set.
  constraint: Constraint;
  // The error code, e.g. 'required' or 'email'.
  // Defaults to 'constraint'.
  errorCode?: string;
  // The error data, e.g. a boolean `true` or the message displayed
  // below the form field.
  errorData?: any;
};

export type FormFieldModifier = {
  type:
    | 'disabled'
    | 'enabled'
    | 'checked'
    | 'unchecked'
    | 'focused'
    | 'visible'
    | 'hidden'
    | 'value'
    | 'reload';
  // Optional configuration used by modifiers.
  // Examples:
  // - value:
  //   Specify the new value of the form field. This can be a tokenized
  //   string.
  //   `{{ name | rstrip("/") }}/`
  // - reload:
  //   Specify the DataStore object that is used to reload the content
  //   of the `select` form field.
  typeConfig?: any;
  // Apply the opposite type, e.g. `disabled` for `enabled`, if the
  // constraint is falsy. Defaults to `true`.
  opposite?: boolean;
  // When the constraint is truthy, then the modifier gets applied.
  // The form fields that this modifier depends on are extracted from
  // the `prop` fields of the constraint. Whenever the value of one
  // of those form fields changes, then the modifier is triggered.
  // The constraint has access to the current form values and the
  // context of the page which includes the following variables:
  // - `_session.username`
  // - `_session.permissions`
  // - `_routeConfig`
  // - `_routeParams`
  // - `_routeQueryParams`
  // - `_routeUrlSegments`
  // Note: both options `constraint` and `deps` are mutually exclusive.
  constraint?: Constraint;
  // A list of form field names that this modifier depends on. If one
  // of the specified fields is changed, the modifier gets triggered.
  // Note: both options `constraint` and `deps` are mutually exclusive.
  deps?: Array<FormFieldName>;
};
