const template = `
<div id="field-{{id}}" class="mb-4">
  <label class="block mb-2 text-sm font-bold text-gray-700" for="{{id}}">
    {{label}}
  </label>
  <input
    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    id="{{id}}"
    name="{{id}}"
    type="{{type}}"
    value="{{text}}"
    placeholder="{{placeholder}}"
    {{#if require}}required{{/if}} 
  />
  {{#unless valid}}
  <div class="flex items-start mb-1">
      <label class="block text-sm text-red-300" for="cus_email">{{validateMessage}}</label>
  </div>
  {{/unless}}
</div>
`;

export default Handlebars.compile(template);
