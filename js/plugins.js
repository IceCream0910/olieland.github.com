/** 
 * ===================================================================
 * javascript plugins
 *
 * ------------------------------------------------------------------- 
 */

/*! jQuery Validation Plugin - v1.15.0 - 2/24/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
! function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery) }(function(a) { a.extend(a.fn, { validate: function(b) { if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")); var c = a.data(this[0], "validator"); return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) { c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0) }), this.on("submit.validate", function(b) {
                function d() { var d, e; return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0 } return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1) })), c) }, valid: function() { var b, c, d; return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() { b = c.element(this) && b, b || (d = d.concat(c.errorList)) }), c.errorList = d), b }, rules: function(b, c) { if (this.length) { var d, e, f, g, h, i, j = this[0]; if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages)); break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(b, c) { i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required") }), i) : (delete e[j.name], f) }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g } } }), a.extend(a.expr[":"], { blank: function(b) { return !a.trim("" + a(b).val()) }, filled: function(b) { var c = a(b).val(); return null !== c && !!a.trim("" + c) }, unchecked: function(b) { return !a(b).prop("checked") } }), a.validator = function(b, c) { this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init() }, a.validator.format = function(b, c) { return 1 === arguments.length ? function() { var c = a.makeArray(arguments); return c.unshift(b), a.validator.format.apply(this, c) } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) { b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() { return c }) }), b) }, a.extend(a.validator, { defaults: { messages: {}, groups: {}, rules: {}, errorClass: "error", pendingClass: "pending", validClass: "valid", errorElement: "label", focusCleanup: !1, focusInvalid: !0, errorContainer: a([]), errorLabelContainer: a([]), onsubmit: !0, ignore: ":hidden", ignoreTitle: !1, onfocusin: function(a) { this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a))) }, onfocusout: function(a) { this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a) }, onkeyup: function(b, c) { var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b.name in this.invalid) && this.element(b) }, onclick: function(a) { a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode) }, highlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d) }, unhighlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d) } }, setDefaults: function(b) { a.extend(a.validator.defaults, b) }, messages: { required: "필수 입력 항목입니다.", remote: "Please fix this field.", email: "이메일 형식이 올바르지 않습니다.", url: "올바른 URL을 입력해주세요.", date: "Please enter a valid date.", dateISO: "Please enter a valid date ( ISO ).", number: "Please enter a valid number.", digits: "숫자만 입력 가능합니다.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") }, autoCreateRanges: !1, prototype: { init: function() {
                function b(b) { var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b) }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset(); var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) { "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) { d[c] = b }) }), c = this.settings.rules, a.each(c, function(b, d) { c[b] = a.validator.normalizeRule(d) }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true") }, form: function() { return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid() }, checkForm: function() { this.prepareForm(); for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]); return this.valid() }, element: function(b) { var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0; return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) { b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = h && g.check(e))) }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h }, showErrors: function(b) { if (b) { var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) { return { message: a, element: c.findByName(b)[0] } }), this.successList = a.grep(this.successList, function(a) { return !(a.name in b) }) }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors() }, resetForm: function() { a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors(); var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b) }, resetElements: function(a) { var b; if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass) }, numberOfInvalids: function() { return this.objectLength(this.invalid) }, objectLength: function(a) { var b, c = 0; for (b in a) a[b] && c++; return c }, hideErrors: function() { this.hideThese(this.toHide) }, hideThese: function(a) { a.not(this.containers).text(""), this.addWrapper(a).hide() }, valid: function() { return 0 === this.size() }, size: function() { return this.errorList.length }, focusInvalid: function() { if (this.settings.focusInvalid) try { a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (b) {} }, findLastActive: function() { var b = this.lastActive; return b && 1 === a.grep(this.errorList, function(a) { return a.element.name === b.name }).length && b }, elements: function() { var b = this,
                    c = {}; return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() { var d = this.name || a(this).attr("name"); return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), d in c || !b.objectLength(a(this).rules()) ? !1 : (c[d] = !0, !0) }) }, clean: function(b) { return a(b)[0] }, errors: function() { var b = this.settings.errorClass.split(" ").join("."); return a(this.settings.errorElement + "." + b, this.errorContext) }, resetInternals: function() { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]) }, reset: function() { this.resetInternals(), this.currentElements = a([]) }, prepareForm: function() { this.reset(), this.toHide = this.errors().add(this.containers) }, prepareElement: function(a) { this.reset(), this.toHide = this.errorsFor(a) }, elementValue: function(b) { var c, d, e = a(b),
                    f = b.type; return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c) }, check: function(b) { b = this.validationTargetFor(this.clean(b)); var c, d, e, f = a(b).rules(),
                    g = a.map(f, function(a, b) { return b }).length,
                    h = !1,
                    i = this.elementValue(b); if ("function" == typeof f.normalizer) { if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");
                    delete f.normalizer } for (d in f) { e = { method: d, parameters: f[d] }; try { if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) { h = !0; continue } if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b))); if (!c) return this.formatAndAdd(b, e), !1 } catch (j) { throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j } } if (!h) return this.objectLength(f) && this.successList.push(b), !0 }, customDataMessage: function(b, c) { return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg") }, customMessage: function(a, b) { var c = this.settings.messages[a]; return c && (c.constructor === String ? c : c[b]) }, findDefined: function() { for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a] }, defaultMessage: function(b, c) { var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g; return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d }, formatAndAdd: function(a, b) { var c = this.defaultMessage(a, b);
                this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c }, addWrapper: function(a) { return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a }, defaultShowErrors: function() { var a, b, c; for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message); if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]); if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show() }, validElements: function() { return this.currentElements.not(this.invalidElements()) }, invalidElements: function() { return a(this.errorList).map(function() { return this.element }) }, showLabel: function(b, c) { var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) { c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id")) })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h) }, errorsFor: function(b) { var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *"; return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e) }, escapeCssMeta: function(a) { return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1") }, idOrName: function(a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name) }, validationTargetFor: function(b) { return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0] }, checkable: function(a) { return /radio|checkbox/i.test(a.type) }, findByName: function(b) { return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']") }, getLength: function(b, c) { switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length } return b.length }, depend: function(a, b) { return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0 }, dependTypes: { "boolean": function(a) { return a }, string: function(b, c) { return !!a(b, c.form).length }, "function": function(a, b) { return a(b) } }, optional: function(b) { var c = this.elementValue(b); return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch" }, startRequest: function(b) { this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0) }, stopRequest: function(b, c) { this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) }, previousValue: function(b, c) { return a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) }) }, destroy: function() { this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur") } }, classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } }, addClassRules: function(b, c) { b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b) }, classRules: function(b) { var c = {},
                d = a(b).attr("class"); return d && a.each(d.split(" "), function() { this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]) }), c }, normalizeAttributeRule: function(a, b, c, d) { /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0) }, attributeRules: function(b) { var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type"); for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d); return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e }, dataRules: function(b) { var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type"); for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d); return e }, staticRules: function(b) { var c = {},
                d = a.data(b.form, "validator"); return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c }, normalizeRules: function(b, c) { return a.each(b, function(d, e) { if (e === !1) return void delete b[d]; if (e.param || e.depends) { var f = !0; switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length; break;
                        case "function":
                            f = e.depends.call(c, c) }
                    f ? b[d] = void 0 !== e.param ? e.param : !0 : (a.data(c.form, "validator").resetElements(a(c)), delete b[d]) } }), a.each(b, function(d, e) { b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e }), a.each(["minlength", "maxlength"], function() { b[this] && (b[this] = Number(b[this])) }), a.each(["rangelength", "range"], function() { var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])])) }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b }, normalizeRule: function(b) { if ("string" == typeof b) { var c = {};
                a.each(b.split(/\s/), function() { c[this] = !0 }), b = c } return b }, addMethod: function(b, c, d) { a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b)) }, methods: { required: function(b, c, d) { if (!this.depend(d, c)) return "dependency-mismatch"; if ("select" === c.nodeName.toLowerCase()) { var e = a(c).val(); return e && e.length > 0 } return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0 }, email: function(a, b) { return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a) }, url: function(a, b) { return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a) }, date: function(a, b) { return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString()) }, dateISO: function(a, b) { return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a) }, number: function(a, b) { return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a) }, digits: function(a, b) { return this.optional(b) || /^\d+$/.test(a) }, minlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d }, maxlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || d >= e }, rangelength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d[0] && e <= d[1] }, min: function(a, b, c) { return this.optional(b) || a >= c }, max: function(a, b, c) { return this.optional(b) || c >= a }, range: function(a, b, c) { return this.optional(b) || a >= c[0] && a <= c[1] }, step: function(b, c, d) { var e = a(c).attr("type"),
                    f = "Step attribute on input type " + e + " is not supported.",
                    g = ["text", "number", "range"],
                    h = new RegExp("\\b" + e + "\\b"),
                    i = e && !h.test(g.join()); if (i) throw new Error(f); return this.optional(c) || b % d === 0 }, equalTo: function(b, c, d) { var e = a(d); return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() { a(c).valid() }), b === e.val() }, remote: function(b, c, d, e) { if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote"; var f, g, h, i = this.previousValue(c, e); return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, { mode: "abort", port: "validate" + c.name, dataType: "json", data: g, context: f.currentForm, success: function(a) { var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j) } }, d)), "pending") } } }); var b, c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) { var e = a.port; "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d) }) : (b = a.ajax, a.ajax = function(d) { var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port; return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments) }) });


/*!
Mailchimp Ajax Submit
jQuery Plugin
Author: Siddharth Doshi

Use:
===
$('#form_id').ajaxchimp(options);

- Form should have one <input> element with attribute 'type=email'
- Form should have one label element with attribute 'for=email_input_id' (used to display error/success message)
- All options are optional.

Options:
=======
options = {
    language: 'en',
    callback: callbackFunction,
    url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f'
}

Notes:
=====
To get the mailchimp JSONP url (undocumented), change 'post?' to 'post-json?' and add '&c=?' to the end.
For e.g. 'http://blahblah.us1.list-manage.com/subscribe/post-json?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f&c=?',
*/
(function($) { "use strict";
    $.ajaxChimp = { responses: { "We have sent you a confirmation email": 0, "Please enter a value": 1, "An email address must contain a single @": 2, "The domain portion of the email address is invalid (the portion after the @: )": 3, "The username portion of the email address is invalid (the portion before the @: )": 4, "This email address looks fake or invalid. Please enter a real email address": 5 }, translations: { en: null }, init: function(selector, options) { $(selector).ajaxChimp(options) } };
    $.fn.ajaxChimp = function(options) { $(this).each(function(i, elem) { var form = $(elem); var email = form.find("input[type=email]"); var label = form.find("label[for=" + email.attr("id") + "]"); var settings = $.extend({ url: form.attr("action"), language: "en" }, options); var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
            form.attr("novalidate", "true");
            email.attr("name", "EMAIL");
            form.submit(function() { var msg;

                function successCallback(resp) { if (resp.result === "success") { msg = "We have sent you a confirmation email";
                        label.removeClass("error").addClass("valid");
                        email.removeClass("error").addClass("valid") } else { email.removeClass("valid").addClass("error");
                        label.removeClass("valid").addClass("error"); var index = -1; try { var parts = resp.msg.split(" - ", 2); if (parts[1] === undefined) { msg = resp.msg } else { var i = parseInt(parts[0], 10); if (i.toString() === parts[0]) { index = parts[0];
                                    msg = parts[1] } else { index = -1;
                                    msg = resp.msg } } } catch (e) { index = -1;
                            msg = resp.msg } } if (settings.language !== "en" && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) { msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]] }
                    label.html(msg);
                    label.show(2e3); if (settings.callback) { settings.callback(resp) } } var data = {}; var dataArray = form.serializeArray();
                $.each(dataArray, function(index, item) { data[item.name] = item.value });
                $.ajax({ url: url, data: data, success: successCallback, dataType: "jsonp", error: function(resp, text) { console.log("mailchimp ajax submit error: " + text) } }); var submitMsg = "Submitting..."; if (settings.language !== "en" && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]["submit"]) { submitMsg = $.ajaxChimp.translations[settings.language]["submit"] }
                label.html(submitMsg).show(2e3); return false }) }); return this } })(jQuery);


/* HTML5 Placeholder jQuery Plugin - v2.1.2
 * Copyright (c)2015 Mathias Bynens
 * 2015-06-09
 */
! function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof module && module.exports ? require("jquery") : jQuery) }(function(a) {
    function b(b) { var c = {},
            d = /^jQuery\d+$/; return a.each(b.attributes, function(a, b) { b.specified && !d.test(b.name) && (c[b.name] = b.value) }), c }

    function c(b, c) { var d = this,
            f = a(d); if (d.value == f.attr("placeholder") && f.hasClass(m.customClass))
            if (f.data("placeholder-password")) { if (f = f.hide().nextAll('input[type="password"]:first').show().attr("id", f.removeAttr("id").data("placeholder-id")), b === !0) return f[0].value = c;
                f.focus() } else d.value = "", f.removeClass(m.customClass), d == e() && d.select() }

    function d() { var d, e = this,
            f = a(e),
            g = this.id; if ("" === e.value) { if ("password" === e.type) { if (!f.data("placeholder-textinput")) { try { d = f.clone().prop({ type: "text" }) } catch (h) { d = a("<input>").attr(a.extend(b(this), { type: "text" })) }
                    d.removeAttr("name").data({ "placeholder-password": f, "placeholder-id": g }).bind("focus.placeholder", c), f.data({ "placeholder-textinput": d, "placeholder-id": g }).before(d) }
                f = f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", g).show() }
            f.addClass(m.customClass), f[0].value = f.attr("placeholder") } else f.removeClass(m.customClass) }

    function e() { try { return document.activeElement } catch (a) {} } var f, g, h = "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
        i = "placeholder" in document.createElement("input") && !h,
        j = "placeholder" in document.createElement("textarea") && !h,
        k = a.valHooks,
        l = a.propHooks; if (i && j) g = a.fn.placeholder = function() { return this }, g.input = g.textarea = !0;
    else { var m = {};
        g = a.fn.placeholder = function(b) { var e = { customClass: "placeholder" };
            m = a.extend({}, e, b); var f = this; return f.filter((i ? "textarea" : ":input") + "[placeholder]").not("." + m.customClass).bind({ "focus.placeholder": c, "blur.placeholder": d }).data("placeholder-enabled", !0).trigger("blur.placeholder"), f }, g.input = i, g.textarea = j, f = { get: function(b) { var c = a(b),
                    d = c.data("placeholder-password"); return d ? d[0].value : c.data("placeholder-enabled") && c.hasClass(m.customClass) ? "" : b.value }, set: function(b, f) { var g = a(b),
                    h = g.data("placeholder-password"); return h ? h[0].value = f : g.data("placeholder-enabled") ? ("" === f ? (b.value = f, b != e() && d.call(b)) : g.hasClass(m.customClass) ? c.call(b, !0, f) || (b.value = f) : b.value = f, g) : b.value = f } }, i || (k.input = f, l.value = f), j || (k.textarea = f, l.value = f), a(function() { a(document).delegate("form", "submit.placeholder", function() { var b = a("." + m.customClass, this).each(c);
                setTimeout(function() { b.each(d) }, 10) }) }), a(window).bind("beforeunload.placeholder", function() { a("." + m.customClass).each(function() { this.value = "" }) }) } });


/* jshint browser:true 
 * !
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
! function(a) { "use strict";
    a.fn.fitVids = function(b) { var c = { customSelector: null, ignore: null }; if (!document.getElementById("fit-vids-style")) { var d = document.head || document.getElementsByTagName("head")[0],
                e = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                f = document.createElement("div");
            f.innerHTML = '<p>x</p><style id="fit-vids-style">' + e + "</style>", d.appendChild(f.childNodes[1]) } return b && a.extend(c, b), this.each(function() { var b = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            c.customSelector && b.push(c.customSelector); var d = ".fitvidsignore";
            c.ignore && (d = d + ", " + c.ignore); var e = a(this).find(b.join(","));
            e = e.not("object object"), e = e.not(d), e.each(function(b) { var c = a(this); if (!(c.parents(d).length > 0 || "embed" === this.tagName.toLowerCase() && c.parent("object").length || c.parent(".fluid-width-video-wrapper").length)) { c.css("height") || c.css("width") || !isNaN(c.attr("height")) && !isNaN(c.attr("width")) || (c.attr("height", 9), c.attr("width", 16)); var e = "object" === this.tagName.toLowerCase() || c.attr("height") && !isNaN(parseInt(c.attr("height"), 10)) ? parseInt(c.attr("height"), 10) : c.height(),
                        f = isNaN(parseInt(c.attr("width"), 10)) ? c.width() : parseInt(c.attr("width"), 10),
                        g = e / f; if (!c.attr("id")) { var h = "fitvid" + b;
                        c.attr("id", h) }
                    c.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * g + "%"), c.removeAttr("height").removeAttr("width") } }) }) } }(window.jQuery || window.Zepto);


/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
! function() { "use strict";

    function t(o) { if (!o) throw new Error("No options passed to Waypoint constructor"); if (!o.element) throw new Error("No element option passed to Waypoint constructor"); if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({ name: this.options.group, axis: this.axis }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1 } var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) { this.group.queueTrigger(this, t) }, t.prototype.trigger = function(t) { this.enabled && this.callback && this.callback.apply(this, t) }, t.prototype.destroy = function() { this.context.remove(this), this.group.remove(this), delete i[this.key] }, t.prototype.disable = function() { return this.enabled = !1, this }, t.prototype.enable = function() { return this.context.refresh(), this.enabled = !0, this }, t.prototype.next = function() { return this.group.next(this) }, t.prototype.previous = function() { return this.group.previous(this) }, t.invokeAll = function(t) { var e = []; for (var o in i) e.push(i[o]); for (var n = 0, r = e.length; r > n; n++) e[n][t]() }, t.destroyAll = function() { t.invokeAll("destroy") }, t.disableAll = function() { t.invokeAll("disable") }, t.enableAll = function() { t.invokeAll("enable") }, t.refreshAll = function() { t.Context.refreshAll() }, t.viewportHeight = function() { return window.innerHeight || document.documentElement.clientHeight }, t.viewportWidth = function() { return document.documentElement.clientWidth }, t.adapters = [], t.defaults = { context: window, continuous: !0, enabled: !0, group: "default", horizontal: !1, offset: 0 }, t.offsetAliases = { "bottom-in-view": function() { return this.context.innerHeight() - this.adapter.outerHeight() }, "right-in-view": function() { return this.context.innerWidth() - this.adapter.outerWidth() } }, window.Waypoint = t }(),
function() { "use strict";

    function t(t) { window.setTimeout(t, 1e3 / 60) }

    function e(t) { this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = { x: this.adapter.scrollLeft(), y: this.adapter.scrollTop() }, this.waypoints = { vertical: {}, horizontal: {} }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler() } var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function(t) { var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh() }, e.prototype.checkEmpty = function() { var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete o[this.key]) }, e.prototype.createThrottledResizeHandler = function() {
        function t() { e.handleResize(), e.didResize = !1 } var e = this;
        this.adapter.on("resize.waypoints", function() { e.didResize || (e.didResize = !0, n.requestAnimationFrame(t)) }) }, e.prototype.createThrottledScrollHandler = function() {
        function t() { e.handleScroll(), e.didScroll = !1 } var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t)) }) }, e.prototype.handleResize = function() { n.Context.refreshAll() }, e.prototype.handleScroll = function() { var t = {},
            e = { horizontal: { newScroll: this.adapter.scrollLeft(), oldScroll: this.oldScroll.x, forward: "right", backward: "left" }, vertical: { newScroll: this.adapter.scrollTop(), oldScroll: this.oldScroll.y, forward: "down", backward: "up" } }; for (var i in e) { var o = e[i],
                n = o.newScroll > o.oldScroll,
                r = n ? o.forward : o.backward; for (var s in this.waypoints[i]) { var a = this.waypoints[i][s],
                    l = o.oldScroll < a.triggerPoint,
                    h = o.newScroll >= a.triggerPoint,
                    p = l && h,
                    u = !l && !h;
                (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group) } } for (var c in t) t[c].flushTriggers();
        this.oldScroll = { x: e.horizontal.newScroll, y: e.vertical.newScroll } }, e.prototype.innerHeight = function() { return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight() }, e.prototype.remove = function(t) { delete this.waypoints[t.axis][t.key], this.checkEmpty() }, e.prototype.innerWidth = function() { return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth() }, e.prototype.destroy = function() { var t = []; for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]); for (var o = 0, n = t.length; n > o; o++) t[o].destroy() }, e.prototype.refresh = function() { var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = { horizontal: { contextOffset: e ? 0 : i.left, contextScroll: e ? 0 : this.oldScroll.x, contextDimension: this.innerWidth(), oldScroll: this.oldScroll.x, forward: "right", backward: "left", offsetProp: "left" }, vertical: { contextOffset: e ? 0 : i.top, contextScroll: e ? 0 : this.oldScroll.y, contextDimension: this.innerHeight(), oldScroll: this.oldScroll.y, forward: "down", backward: "up", offsetProp: "top" } }; for (var r in t) { var s = t[r]; for (var a in this.waypoints[r]) { var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = y + l - f, h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group) } } return n.requestAnimationFrame(function() { for (var t in o) o[t].flushTriggers() }), this }, e.findOrCreateByElement = function(t) { return e.findByElement(t) || new e(t) }, e.refreshAll = function() { for (var t in o) o[t].refresh() }, e.findByElement = function(t) { return o[t.waypointContextKey] }, window.onload = function() { r && r(), e.refreshAll() }, n.requestAnimationFrame = function(e) { var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e) }, n.Context = e }(),
function() { "use strict";

    function t(t, e) { return t.triggerPoint - e.triggerPoint }

    function e(t, e) { return e.triggerPoint - t.triggerPoint }

    function i(t) { this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this } var o = { vertical: {}, horizontal: {} },
        n = window.Waypoint;
    i.prototype.add = function(t) { this.waypoints.push(t) }, i.prototype.clearTriggerQueues = function() { this.triggerQueues = { up: [], down: [], left: [], right: [] } }, i.prototype.flushTriggers = function() { for (var i in this.triggerQueues) { var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t); for (var r = 0, s = o.length; s > r; r += 1) { var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i]) } }
        this.clearTriggerQueues() }, i.prototype.next = function(e) { this.waypoints.sort(t); var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1; return o ? null : this.waypoints[i + 1] }, i.prototype.previous = function(e) { this.waypoints.sort(t); var i = n.Adapter.inArray(e, this.waypoints); return i ? this.waypoints[i - 1] : null }, i.prototype.queueTrigger = function(t, e) { this.triggerQueues[e].push(t) }, i.prototype.remove = function(t) { var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1) }, i.prototype.first = function() { return this.waypoints[0] }, i.prototype.last = function() { return this.waypoints[this.waypoints.length - 1] }, i.findOrCreate = function(t) { return o[t.axis][t.name] || new i(t) }, n.Group = i }(),
function() { "use strict";

    function t(t) { this.$element = e(t) } var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) { t.prototype[i] = function() { var t = Array.prototype.slice.call(arguments); return this.$element[i].apply(this.$element, t) } }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) { t[o] = e[o] }), i.adapters.push({ name: "jquery", Adapter: t }), i.Adapter = t }(),
function() { "use strict";

    function t(t) { return function() { var i = [],
                o = arguments[0]; return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() { var n = t.extend({}, o, { element: this }); "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n)) }), i } } var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto)) }();


/*!
 * Masonry PACKAGED v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

! function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) { e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery) }(window, function(t, e) { "use strict";

    function i(i, r, a) {
        function h(t, e, n) { var o, r = "$()." + i + '("' + e + '")'; return t.each(function(t, h) { var u = a.data(h, i); if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r); var d = u[e]; if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method"); var c = d.apply(u, n);
                o = void 0 === o ? c : o }), void 0 !== o ? o : t }

        function u(t, e) { t.each(function(t, n) { var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o)) }) }
        a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function(t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[i] = function(t) { if ("string" == typeof t) { var e = o.call(arguments, 1); return h(this, t, e) } return u(this, t), this }, n(a)) }

    function n(t) {!t || t && t.bridget || (t.bridget = i) } var o = Array.prototype.slice,
        r = t.console,
        s = "undefined" == typeof r ? function() {} : function(t) { r.error(t) }; return n(e || t.jQuery), i }),
function(t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }(this, function() {
    function t() {} var e = t.prototype; return e.on = function(t, e) { if (t && e) { var i = this._events = this._events || {},
                n = i[t] = i[t] || []; return -1 == n.indexOf(e) && n.push(e), this } }, e.once = function(t, e) { if (t && e) { this.on(t, e); var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || []; return n[e] = !0, this } }, e.off = function(t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = i.indexOf(e); return -1 != n && i.splice(n, 1), this } }, e.emitEvent = function(t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = 0,
                o = i[n];
            e = e || []; for (var r = this._onceEvents && this._onceEvents[t]; o;) { var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n] } return this } }, t }),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("get-size/get-size", [], function() { return e() }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function() { "use strict";

    function t(t) { var e = parseFloat(t),
            i = -1 == t.indexOf("%") && !isNaN(e); return i && e }

    function e() {}

    function i() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; u > e; e++) { var i = h[e];
            t[i] = 0 } return t }

    function n(t) { var e = getComputedStyle(t); return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e }

    function o() { if (!d) { d = !0; var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box"; var i = document.body || document.documentElement;
            i.appendChild(e); var o = n(e);
            r.isBoxSizeOuter = s = 200 == t(o.width), i.removeChild(e) } }

    function r(e) { if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) { var r = n(e); if ("none" == r.display) return i(); var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight; for (var d = a.isBorderBox = "border-box" == r.boxSizing, c = 0; u > c; c++) { var l = h[c],
                    f = r[l],
                    m = parseFloat(f);
                a[l] = isNaN(m) ? 0 : m } var p = a.paddingLeft + a.paddingRight,
                g = a.paddingTop + a.paddingBottom,
                y = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                E = a.borderTopWidth + a.borderBottomWidth,
                z = d && s,
                b = t(r.width);
            b !== !1 && (a.width = b + (z ? 0 : p + _)); var x = t(r.height); return x !== !1 && (a.height = x + (z ? 0 : g + E)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + E), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a } } var s, a = "undefined" == typeof console ? e : function(t) { console.error(t) },
        h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        u = h.length,
        d = !1; return r }),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e() }(window, function() { "use strict"; var t = function() { var t = Element.prototype; if (t.matches) return "matches"; if (t.matchesSelector) return "matchesSelector"; for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) { var n = e[i],
                o = n + "MatchesSelector"; if (t[o]) return o } }(); return function(e, i) { return e[t](i) } }),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["matches-selector/matches-selector"], function(i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector) }(window, function(t, e) { var i = {};
    i.extend = function(t, e) { for (var i in e) t[i] = e[i]; return t }, i.modulo = function(t, e) { return (t % e + e) % e }, i.makeArray = function(t) { var e = []; if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t); return e }, i.removeFrom = function(t, e) { var i = t.indexOf(e); - 1 != i && t.splice(i, 1) }, i.getParent = function(t, i) { for (; t != document.body;)
            if (t = t.parentNode, e(t, i)) return t }, i.getQueryElement = function(t) { return "string" == typeof t ? document.querySelector(t) : t }, i.handleEvent = function(t) { var e = "on" + t.type;
        this[e] && this[e](t) }, i.filterFindElements = function(t, n) { t = i.makeArray(t); var o = []; return t.forEach(function(t) { if (t instanceof HTMLElement) { if (!n) return void o.push(t);
                e(t, n) && o.push(t); for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r]) } }), o }, i.debounceMethod = function(t, e, i) { var n = t.prototype[e],
            o = e + "Timeout";
        t.prototype[e] = function() { var t = this[o];
            t && clearTimeout(t); var e = arguments,
                r = this;
            this[o] = setTimeout(function() { n.apply(r, e), delete r[o] }, i || 100) } }, i.docReady = function(t) { "complete" == document.readyState ? t() : document.addEventListener("DOMContentLoaded", t) }, i.toDashed = function(t) { return t.replace(/(.)([A-Z])/g, function(t, e, i) { return e + "-" + i }).toLowerCase() }; var n = t.console; return i.htmlInit = function(e, o) { i.docReady(function() { var r = i.toDashed(o),
                s = "data-" + r,
                a = document.querySelectorAll("[" + s + "]"),
                h = document.querySelectorAll(".js-" + r),
                u = i.makeArray(a).concat(i.makeArray(h)),
                d = s + "-options",
                c = t.jQuery;
            u.forEach(function(t) { var i, r = t.getAttribute(s) || t.getAttribute(d); try { i = r && JSON.parse(r) } catch (a) { return void(n && n.error("Error parsing " + s + " on " + t.className + ": " + a)) } var h = new e(t, i);
                c && c.data(t, o, h) }) }) }, i }),
function(t, e) { "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], function(i, n) { return e(t, i, n) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t, t.EvEmitter, t.getSize)) }(window, function(t, e, i) { "use strict";

    function n(t) { for (var e in t) return !1; return e = null, !0 }

    function o(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) }

    function r(t) { return t.replace(/([A-Z])/g, function(t) { return "-" + t.toLowerCase() }) } var s = document.documentElement.style,
        a = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        h = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[a],
        d = [h, a, a + "Duration", a + "Property"],
        c = o.prototype = Object.create(e.prototype);
    c.constructor = o, c._create = function() { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, c.handleEvent = function(t) { var e = "on" + t.type;
        this[e] && this[e](t) }, c.getSize = function() { this.size = i(this.element) }, c.css = function(t) { var e = this.element.style; for (var i in t) { var n = d[i] || i;
            e[n] = t[i] } }, c.getPosition = function() { var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = t[e ? "left" : "right"],
            o = t[i ? "top" : "bottom"],
            r = this.layout.size,
            s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10),
            a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
        s = isNaN(s) ? 0 : s, a = isNaN(a) ? 0 : a, s -= e ? r.paddingLeft : r.paddingRight, a -= i ? r.paddingTop : r.paddingBottom, this.position.x = s, this.position.y = a }, c.layoutPosition = function() { var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"),
            o = i ? "paddingLeft" : "paddingRight",
            r = i ? "left" : "right",
            s = i ? "right" : "left",
            a = this.position.x + t[o];
        e[r] = this.getXValue(a), e[s] = ""; var h = n ? "paddingTop" : "paddingBottom",
            u = n ? "top" : "bottom",
            d = n ? "bottom" : "top",
            c = this.position.y + t[h];
        e[u] = this.getYValue(c), e[d] = "", this.css(e), this.emitEvent("layout", [this]) }, c.getXValue = function(t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px" }, c.getYValue = function(t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px" }, c._transitionTo = function(t, e) { this.getPosition(); var i = this.position.x,
            n = this.position.y,
            o = parseInt(t, 10),
            r = parseInt(e, 10),
            s = o === this.position.x && r === this.position.y; if (this.setPosition(t, e), s && !this.isTransitioning) return void this.layoutPosition(); var a = t - i,
            h = e - n,
            u = {};
        u.transform = this.getTranslate(a, h), this.transition({ to: u, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, c.getTranslate = function(t, e) { var i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"); return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)" }, c.goTo = function(t, e) { this.setPosition(t, e), this.layoutPosition() }, c.moveTo = c._transitionTo, c.setPosition = function(t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, c._nonTransition = function(t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, c._transition = function(t) { if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t); var e = this._transn; for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]; for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0); if (t.from) { this.css(t.from); var n = this.element.offsetHeight;
            n = null }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0 }; var l = "opacity," + r(d.transform || "transform");
    c.enableTransition = function() { this.isTransitioning || (this.css({ transitionProperty: l, transitionDuration: this.layout.options.transitionDuration }), this.element.addEventListener(u, this, !1)) }, c.transition = o.prototype[a ? "_transition" : "_nonTransition"], c.onwebkitTransitionEnd = function(t) { this.ontransitionend(t) }, c.onotransitionend = function(t) { this.ontransitionend(t) }; var f = { "-webkit-transform": "transform" };
    c.ontransitionend = function(t) { if (t.target === this.element) { var e = this._transn,
                i = f[t.propertyName] || t.propertyName; if (delete e.ingProperties[i], n(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) { var o = e.onEnd[i];
                o.call(this), delete e.onEnd[i] }
            this.emitEvent("transitionEnd", [this]) } }, c.disableTransition = function() { this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1 }, c._removeStyles = function(t) { var e = {}; for (var i in t) e[i] = "";
        this.css(e) }; var m = { transitionProperty: "", transitionDuration: "" }; return c.removeTransitionStyles = function() { this.css(m) }, c.removeElem = function() { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, c.remove = function() { return a && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() { this.removeElem() }), void this.hide()) : void this.removeElem() }, c.reveal = function() { delete this.isHidden, this.css({ display: "" }); var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e }) }, c.onRevealTransitionEnd = function() { this.isHidden || this.emitEvent("reveal") }, c.getHideRevealTransitionEndProperty = function(t) { var e = this.layout.options[t]; if (e.opacity) return "opacity"; for (var i in e) return i }, c.hide = function() { this.isHidden = !0, this.css({ display: "" }); var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e }) }, c.onHideTransitionEnd = function() { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, c.destroy = function() { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, o }),
function(t, e) { "use strict"; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, r) { return e(t, i, n, o, r) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function(t, e, i, n, o) { "use strict";

    function r(t, e) { var i = n.getQueryElement(t); if (!i) return void(a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e); var o = ++d;
        this.element.outlayerGUID = o, c[o] = this, this._create(); var r = this._getOption("initLayout");
        r && this.layout() }

    function s(t) {
        function e() { t.apply(this, arguments) } return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e } var a = t.console,
        h = t.jQuery,
        u = function() {},
        d = 0,
        c = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }; var l = r.prototype; return n.extend(l, e.prototype), l.option = function(t) { n.extend(this.options, t) }, l._getOption = function(t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, r.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, l._create = function() { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle); var t = this._getOption("resize");
        t && this.bindResize() }, l.reloadItems = function() { this.items = this._itemize(this.element.children) }, l._itemize = function(t) { for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) { var r = e[o],
                s = new i(r, this);
            n.push(s) } return n }, l._filterFindItemElements = function(t) { return n.filterFindElements(t, this.options.itemSelector) }, l.getItemElements = function() { return this.items.map(function(t) { return t.element }) }, l.layout = function() { this._resetLayout(), this._manageStamps(); var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0 }, l._init = l.layout, l._resetLayout = function() { this.getSize() }, l.getSize = function() { this.size = i(this.element) }, l._getMeasurement = function(t, e) { var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0 }, l.layoutItems = function(t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, l._getItemsForLayout = function(t) { return t.filter(function(t) { return !t.isIgnored }) }, l._layoutItems = function(t, e) { if (this._emitCompleteOnItems("layout", t), t && t.length) { var i = [];
            t.forEach(function(t) { var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n) }, this), this._processLayoutQueue(i) } }, l._getItemLayoutPosition = function() { return { x: 0, y: 0 } }, l._processLayoutQueue = function(t) { t.forEach(function(t) { this._positionItem(t.item, t.x, t.y, t.isInstant) }, this) }, l._positionItem = function(t, e, i, n) { n ? t.goTo(e, i) : t.moveTo(e, i) }, l._postLayout = function() { this.resizeContainer() }, l.resizeContainer = function() { var t = this._getOption("resizeContainer"); if (t) { var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1)) } }, l._getContainerSize = u, l._setContainerMeasure = function(t, e) { if (void 0 !== t) { var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px" } }, l._emitCompleteOnItems = function(t, e) {
        function i() { o.dispatchEvent(t + "Complete", null, [e]) }

        function n() { s++, s == r && i() } var o = this,
            r = e.length; if (!e || !r) return void i(); var s = 0;
        e.forEach(function(e) { e.once(t, n) }) }, l.dispatchEvent = function(t, e, i) { var n = e ? [e].concat(i) : i; if (this.emitEvent(t, n), h)
            if (this.$element = this.$element || h(this.element), e) { var o = h.Event(e);
                o.type = t, this.$element.trigger(o, i) } else this.$element.trigger(t, i) }, l.ignore = function(t) { var e = this.getItem(t);
        e && (e.isIgnored = !0) }, l.unignore = function(t) { var e = this.getItem(t);
        e && delete e.isIgnored }, l.stamp = function(t) { t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this)) }, l.unstamp = function(t) { t = this._find(t), t && t.forEach(function(t) { n.removeFrom(this.stamps, t), this.unignore(t) }, this) }, l._find = function(t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0 }, l._manageStamps = function() { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, l._getBoundingRect = function() { var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) } }, l._manageStamp = u, l._getElementOffset = function(t) { var e = t.getBoundingClientRect(),
            n = this._boundingRect,
            o = i(t),
            r = { left: e.left - n.left - o.marginLeft, top: e.top - n.top - o.marginTop, right: n.right - e.right - o.marginRight, bottom: n.bottom - e.bottom - o.marginBottom }; return r }, l.handleEvent = n.handleEvent, l.bindResize = function() { t.addEventListener("resize", this), this.isResizeBound = !0 }, l.unbindResize = function() { t.removeEventListener("resize", this), this.isResizeBound = !1 }, l.onresize = function() { this.resize() }, n.debounceMethod(r, "onresize", 100), l.resize = function() { this.isResizeBound && this.needsResizeLayout() && this.layout() }, l.needsResizeLayout = function() { var t = i(this.element),
            e = this.size && t; return e && t.innerWidth !== this.size.innerWidth }, l.addItems = function(t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, l.appended = function(t) { var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e)) }, l.prepended = function(t) { var e = this._itemize(t); if (e.length) { var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i) } }, l.reveal = function(t) { this._emitCompleteOnItems("reveal", t), t && t.length && t.forEach(function(t) { t.reveal() }) }, l.hide = function(t) { this._emitCompleteOnItems("hide", t), t && t.length && t.forEach(function(t) { t.hide() }) }, l.revealItemElements = function(t) { var e = this.getItems(t);
        this.reveal(e) }, l.hideItemElements = function(t) { var e = this.getItems(t);
        this.hide(e) }, l.getItem = function(t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, l.getItems = function(t) { t = n.makeArray(t); var e = []; return t.forEach(function(t) { var i = this.getItem(t);
            i && e.push(i) }, this), e }, l.remove = function(t) { var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) { t.remove(), n.removeFrom(this.items, t) }, this) }, l.destroy = function() { var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) { t.destroy() }), this.unbindResize(); var e = this.element.outlayerGUID;
        delete c[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace) }, r.data = function(t) { t = n.getQueryElement(t); var e = t && t.outlayerGUID; return e && c[e] }, r.create = function(t, e) { var i = s(r); return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i }, r.Item = o, r }),
function(t, e) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize) }(window, function(t, e) { var i = t.create("masonry"); return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function() { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = []; for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0 }, i.prototype.measureColumns = function() { if (this.getContainerWidth(), !this.columnWidth) { var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth } var n = this.columnWidth += this.gutter,
            o = this.containerWidth + this.gutter,
            r = o / n,
            s = n - o % n,
            a = s && 1 > s ? "round" : "floor";
        r = Math[a](r), this.cols = Math.max(r, 1) }, i.prototype.getContainerWidth = function() { var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            n = e(i);
        this.containerWidth = n && n.innerWidth }, i.prototype._getItemLayoutPosition = function(t) { t.getSize(); var e = t.size.outerWidth % this.columnWidth,
            i = e && 1 > e ? "round" : "ceil",
            n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols); for (var o = this._getColGroup(n), r = Math.min.apply(Math, o), s = o.indexOf(r), a = { x: this.columnWidth * s, y: r }, h = r + t.size.outerHeight, u = this.cols + 1 - o.length, d = 0; u > d; d++) this.colYs[s + d] = h; return a }, i.prototype._getColGroup = function(t) { if (2 > t) return this.colYs; for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) { var o = this.colYs.slice(n, n + t);
            e[n] = Math.max.apply(Math, o) } return e }, i.prototype._manageStamp = function(t) { var i = e(t),
            n = this._getElementOffset(t),
            o = this._getOption("originLeft"),
            r = o ? n.left : n.right,
            s = r + i.outerWidth,
            a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a); var h = Math.floor(s / this.columnWidth);
        h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h); for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, c = a; h >= c; c++) this.colYs[c] = Math.max(d, this.colYs[c]) }, i.prototype._getContainerSize = function() { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t }, i.prototype._getContainerFitWidth = function() { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++; return (this.cols - t) * this.columnWidth - this.gutter }, i.prototype.needsResizeLayout = function() { var t = this.containerWidth; return this.getContainerWidth(), t != this.containerWidth }, i });


/*!
 * imagesLoaded PACKAGED v3.2.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function() { "use strict";

    function e() {}

    function t(e, t) { for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1 }

    function n(e) { return function() { return this[e].apply(this, arguments) } } var i = e.prototype,
        r = this,
        s = r.EventEmitter;
    i.getListeners = function(e) { var t, n, i = this._getEvents(); if ("object" == typeof e) { t = {}; for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]) } else t = i[e] || (i[e] = []); return t }, i.flattenListeners = function(e) { var t, n = []; for (t = 0; t < e.length; t += 1) n.push(e[t].listener); return n }, i.getListenersAsObject = function(e) { var t, n = this.getListeners(e); return n instanceof Array && (t = {}, t[e] = n), t || n }, i.addListener = function(e, n) { var i, r = this.getListenersAsObject(e),
            s = "object" == typeof n; for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(s ? n : { listener: n, once: !1 }); return this }, i.on = n("addListener"), i.addOnceListener = function(e, t) { return this.addListener(e, { listener: t, once: !0 }) }, i.once = n("addOnceListener"), i.defineEvent = function(e) { return this.getListeners(e), this }, i.defineEvents = function(e) { for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]); return this }, i.removeListener = function(e, n) { var i, r, s = this.getListenersAsObject(e); for (r in s) s.hasOwnProperty(r) && (i = t(s[r], n), -1 !== i && s[r].splice(i, 1)); return this }, i.off = n("removeListener"), i.addListeners = function(e, t) { return this.manipulateListeners(!1, e, t) }, i.removeListeners = function(e, t) { return this.manipulateListeners(!0, e, t) }, i.manipulateListeners = function(e, t, n) { var i, r, s = e ? this.removeListener : this.addListener,
            o = e ? this.removeListeners : this.addListeners; if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) s.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? s.call(this, i, r) : o.call(this, i, r)); return this }, i.removeEvent = function(e) { var t, n = typeof e,
            i = this._getEvents(); if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events; return this }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) { var n, i, r, s, o = this.getListenersAsObject(e); for (r in o)
            if (o.hasOwnProperty(r))
                for (i = o[r].length; i--;) n = o[r][i], n.once === !0 && this.removeListener(e, n.listener), s = n.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this }, i.trigger = n("emitEvent"), i.emit = function(e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, i.setOnceReturnValue = function(e) { return this._onceReturnValue = e, this }, i._getOnceReturnValue = function() { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, i._getEvents = function() { return this._events || (this._events = {}) }, e.noConflict = function() { return r.EventEmitter = s, e }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() { return e }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e }).call(this),
    function(e) {
        function t(t) { var n = e.event; return n.target = n.target || n.srcElement || t, n } var n = document.documentElement,
            i = function() {};
        n.addEventListener ? i = function(e, t, n) { e.addEventListener(t, n, !1) } : n.attachEvent && (i = function(e, n, i) { e[n + i] = i.handleEvent ? function() { var n = t(e);
                i.handleEvent.call(i, n) } : function() { var n = t(e);
                i.call(e, n) }, e.attachEvent("on" + n, e[n + i]) }); var r = function() {};
        n.removeEventListener ? r = function(e, t, n) { e.removeEventListener(t, n, !1) } : n.detachEvent && (r = function(e, t, n) { e.detachEvent("on" + t, e[t + n]); try { delete e[t + n] } catch (i) { e[t + n] = void 0 } }); var s = { bind: i, unbind: r }; "function" == typeof define && define.amd ? define("eventie/eventie", s) : e.eventie = s }(this),
    function(e, t) { "use strict"; "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) { return t(e, n, i) }) : "object" == typeof module && module.exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie) }(window, function(e, t, n) {
        function i(e, t) { for (var n in t) e[n] = t[n]; return e }

        function r(e) { return "[object Array]" == f.call(e) }

        function s(e) { var t = []; if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0; n < e.length; n++) t.push(e[n]);
            else t.push(e); return t }

        function o(e, t, n) { if (!(this instanceof o)) return new o(e, t, n); "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = s(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), u && (this.jqDeferred = new u.Deferred); var r = this;
            setTimeout(function() { r.check() }) }

        function h(e) { this.img = e }

        function a(e, t) { this.url = e, this.element = t, this.img = new Image } var u = e.jQuery,
            c = e.console,
            f = Object.prototype.toString;
        o.prototype = new t, o.prototype.options = {}, o.prototype.getImages = function() { this.images = []; for (var e = 0; e < this.elements.length; e++) { var t = this.elements[e];
                this.addElementImages(t) } }, o.prototype.addElementImages = function(e) { "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e); var t = e.nodeType; if (t && d[t]) { for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) { var r = n[i];
                    this.addImage(r) } if ("string" == typeof this.options.background) { var s = e.querySelectorAll(this.options.background); for (i = 0; i < s.length; i++) { var o = s[i];
                        this.addElementBackgroundImages(o) } } } }; var d = { 1: !0, 9: !0, 11: !0 };
        o.prototype.addElementBackgroundImages = function(e) { for (var t = m(e), n = /url\(['"]*([^'"\)]+)['"]*\)/gi, i = n.exec(t.backgroundImage); null !== i;) { var r = i && i[1];
                r && this.addBackground(r, e), i = n.exec(t.backgroundImage) } }; var m = e.getComputedStyle || function(e) { return e.currentStyle }; return o.prototype.addImage = function(e) { var t = new h(e);
            this.images.push(t) }, o.prototype.addBackground = function(e, t) { var n = new a(e, t);
            this.images.push(n) }, o.prototype.check = function() {
            function e(e, n, i) { setTimeout(function() { t.progress(e, n, i) }) } var t = this; if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete(); for (var n = 0; n < this.images.length; n++) { var i = this.images[n];
                i.once("progress", e), i.check() } }, o.prototype.progress = function(e, t, n) { this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emit("progress", this, e, t), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && c && c.log("progress: " + n, e, t) }, o.prototype.complete = function() { var e = this.hasAnyBroken ? "fail" : "done"; if (this.isComplete = !0, this.emit(e, this), this.emit("always", this), this.jqDeferred) { var t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this) } }, h.prototype = new t, h.prototype.check = function() { var e = this.getIsImageComplete(); return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, n.bind(this.proxyImage, "load", this), n.bind(this.proxyImage, "error", this), n.bind(this.img, "load", this), n.bind(this.img, "error", this), void(this.proxyImage.src = this.img.src)) }, h.prototype.getIsImageComplete = function() { return this.img.complete && void 0 !== this.img.naturalWidth }, h.prototype.confirm = function(e, t) { this.isLoaded = e, this.emit("progress", this, this.img, t) }, h.prototype.handleEvent = function(e) { var t = "on" + e.type;
            this[t] && this[t](e) }, h.prototype.onload = function() { this.confirm(!0, "onload"), this.unbindEvents() }, h.prototype.onerror = function() { this.confirm(!1, "onerror"), this.unbindEvents() }, h.prototype.unbindEvents = function() { n.unbind(this.proxyImage, "load", this), n.unbind(this.proxyImage, "error", this), n.unbind(this.img, "load", this), n.unbind(this.img, "error", this) }, a.prototype = new h, a.prototype.check = function() { n.bind(this.img, "load", this), n.bind(this.img, "error", this), this.img.src = this.url; var e = this.getIsImageComplete();
            e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents()) }, a.prototype.unbindEvents = function() { n.unbind(this.img, "load", this), n.unbind(this.img, "error", this) }, a.prototype.confirm = function(e, t) { this.isLoaded = e, this.emit("progress", this, this.element, t) }, o.makeJQueryPlugin = function(t) { t = t || e.jQuery, t && (u = t, u.fn.imagesLoaded = function(e, t) { var n = new o(this, e, t); return n.jqDeferred.promise(u(this)) }) }, o.makeJQueryPlugin(), o });



/*! lightgallery - v1.2.22 - 2016-07-20
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
! function(a, b, c, d) { "use strict";

    function e(b, d) { if (this.el = b, this.$el = a(b), this.s = a.extend({}, f, d), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array."; return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in c.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = a(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(a(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this } var f = { mode: "lg-slide", cssEasing: "ease", easing: "linear", speed: 600, height: "100%", width: "100%", addClass: "", startClass: "lg-start-zoom", backdropDuration: 150, hideBarsDelay: 6e3, useLeft: !1, closable: !0, loop: !0, escKey: !0, keyPress: !0, controls: !0, slideEndAnimatoin: !0, hideControlOnEnd: !1, mousewheel: !0, getCaptionFromTitleOrAlt: !0, appendSubHtmlTo: ".lg-sub-html", subHtmlSelectorRelative: !1, preload: 1, showAfterLoad: !0, selector: "", selectWithin: "", nextHtml: "", prevHtml: "", index: !1, iframeMaxWidth: "100%", download: !0, counter: !0, appendCounterTo: ".lg-toolbar", swipeThreshold: 50, enableSwipe: !0, enableDrag: !0, dynamic: !1, dynamicEl: [], galleryId: 1 };
    e.prototype.init = function() { var c = this;
        c.s.preload > c.$items.length && (c.s.preload = c.$items.length); var d = b.location.hash;
        d.indexOf("lg=" + this.s.galleryId) > 0 && (c.index = parseInt(d.split("&slide=")[1], 10), a("body").addClass("lg-from-hash"), a("body").hasClass("lg-on") || (setTimeout(function() { c.build(c.index) }), a("body").addClass("lg-on"))), c.s.dynamic ? (c.$el.trigger("onBeforeOpen.lg"), c.index = c.s.index || 0, a("body").hasClass("lg-on") || setTimeout(function() { c.build(c.index), a("body").addClass("lg-on") })) : c.$items.on("click.lgcustom", function(b) { try { b.preventDefault(), b.preventDefault() } catch (a) { b.returnValue = !1 }
            c.$el.trigger("onBeforeOpen.lg"), c.index = c.s.index || c.$items.index(this), a("body").hasClass("lg-on") || (c.build(c.index), a("body").addClass("lg-on")) }) }, e.prototype.build = function(b) { var c = this;
        c.structure(), a.each(a.fn.lightGallery.modules, function(b) { c.modules[b] = new a.fn.lightGallery.modules[b](c.el) }), c.slide(b, !1, !1), c.s.keyPress && c.keyPress(), c.$items.length > 1 && (c.arrow(), setTimeout(function() { c.enableDrag(), c.enableSwipe() }, 50), c.s.mousewheel && c.mousewheel()), c.counter(), c.closeGallery(), c.$el.trigger("onAfterOpen.lg"), c.$outer.on("mousemove.lg click.lg touchstart.lg", function() { c.$outer.removeClass("lg-hide-items"), clearTimeout(c.hideBartimeout), c.hideBartimeout = setTimeout(function() { c.$outer.addClass("lg-hide-items") }, c.s.hideBarsDelay) }) }, e.prototype.structure = function() { var c, d = "",
            e = "",
            f = 0,
            g = "",
            h = this; for (a("body").append('<div class="lg-backdrop"></div>'), a(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), f = 0; f < this.$items.length; f++) d += '<div class="lg-item"></div>'; if (this.s.controls && this.$items.length > 1 && (e = '<div class="lg-actions"><div class="lg-prev lg-icon">' + this.s.prevHtml + '</div><div class="lg-next lg-icon">' + this.s.nextHtml + "</div></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (g = '<div class="lg-sub-html"></div>'), c = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + d + '</div><div class="lg-toolbar group"><span class="lg-close lg-icon"></span></div>' + e + g + "</div></div>", a("body").append(c), this.$outer = a(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), h.setTop(), a(b).on("resize.lg orientationchange.lg", function() { setTimeout(function() { h.setTop() }, 100) }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) { var i = this.$outer.find(".lg-inner");
            i.css("transition-timing-function", this.s.cssEasing), i.css("transition-duration", this.s.speed + "ms") }
        a(".lg-backdrop").addClass("in"), setTimeout(function() { h.$outer.addClass("lg-visible") }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = a(b).scrollTop() }, e.prototype.setTop = function() { if ("100%" !== this.s.height) { var c = a(b).height(),
                d = (c - parseInt(this.s.height, 10)) / 2,
                e = this.$outer.find(".lg");
            c >= parseInt(this.s.height, 10) ? e.css("top", d + "px") : e.css("top", "0px") } }, e.prototype.doCss = function() { var a = function() { var a = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                b = c.documentElement,
                d = 0; for (d = 0; d < a.length; d++)
                if (a[d] in b.style) return !0 }; return !!a() }, e.prototype.isVideo = function(a, b) { var c; if (c = this.s.dynamic ? this.s.dynamicEl[b].html : this.$items.eq(b).attr("data-html"), !a && c) return { html5: !0 }; var d = a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
            e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
            f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
            g = a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i); return d ? { youtube: d } : e ? { vimeo: e } : f ? { dailymotion: f } : g ? { vk: g } : void 0 }, e.prototype.counter = function() { this.s.counter && a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>") }, e.prototype.addHtml = function(b) { var c, d, e = null; if (this.s.dynamic ? this.s.dynamicEl[b].subHtmlUrl ? c = this.s.dynamicEl[b].subHtmlUrl : e = this.s.dynamicEl[b].subHtml : (d = this.$items.eq(b), d.attr("data-sub-html-url") ? c = d.attr("data-sub-html-url") : (e = d.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !e && (e = d.attr("title") || d.find("img").first().attr("alt")))), !c)
            if ("undefined" != typeof e && null !== e) { var f = e.substring(0, 1); "." !== f && "#" !== f || (e = this.s.subHtmlSelectorRelative && !this.s.dynamic ? d.find(e).html() : a(e).html()) } else e = "";
            ".lg-sub-html" === this.s.appendSubHtmlTo ? c ? this.$outer.find(this.s.appendSubHtmlTo).load(c) : this.$outer.find(this.s.appendSubHtmlTo).html(e) : c ? this.$slide.eq(b).load(c) : this.$slide.eq(b).append(e), "undefined" != typeof e && null !== e && ("" === e ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [b]) }, e.prototype.preload = function(a) { var b = 1,
            c = 1; for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++) this.loadContent(a + b, !1, 0); for (c = 1; c <= this.s.preload && !(a - c < 0); c++) this.loadContent(a - c, !1, 0) }, e.prototype.loadContent = function(c, d, e) { var f, g, h, i, j, k, l = this,
            m = !1,
            n = function(c) { for (var d = [], e = [], f = 0; f < c.length; f++) { var h = c[f].split(" "); "" === h[0] && h.splice(0, 1), e.push(h[0]), d.push(h[1]) } for (var i = a(b).width(), j = 0; j < d.length; j++)
                    if (parseInt(d[j], 10) > i) { g = e[j]; break } }; if (l.s.dynamic) { if (l.s.dynamicEl[c].poster && (m = !0, h = l.s.dynamicEl[c].poster), k = l.s.dynamicEl[c].html, g = l.s.dynamicEl[c].src, l.s.dynamicEl[c].responsive) { var o = l.s.dynamicEl[c].responsive.split(",");
                n(o) }
            i = l.s.dynamicEl[c].srcset, j = l.s.dynamicEl[c].sizes } else { if (l.$items.eq(c).attr("data-poster") && (m = !0, h = l.$items.eq(c).attr("data-poster")), k = l.$items.eq(c).attr("data-html"), g = l.$items.eq(c).attr("href") || l.$items.eq(c).attr("data-src"), l.$items.eq(c).attr("data-responsive")) { var p = l.$items.eq(c).attr("data-responsive").split(",");
                n(p) }
            i = l.$items.eq(c).attr("data-srcset"), j = l.$items.eq(c).attr("data-sizes") } var q = !1;
        l.s.dynamic ? l.s.dynamicEl[c].iframe && (q = !0) : "true" === l.$items.eq(c).attr("data-iframe") && (q = !0); var r = l.isVideo(g, c); if (!l.$slide.eq(c).hasClass("lg-loaded")) { if (q) l.$slide.eq(c).prepend('<div class="lg-video-cont" style="max-width:' + l.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + g + '"  allowfullscreen="true"></iframe></div></div>');
            else if (m) { var s = "";
                s = r && r.youtube ? "lg-has-youtube" : r && r.vimeo ? "lg-has-vimeo" : "lg-has-html5", l.$slide.eq(c).prepend('<div class="lg-video-cont ' + s + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + h + '" /></div></div>') } else r ? (l.$slide.eq(c).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), l.$el.trigger("hasVideo.lg", [c, g, k])) : l.$slide.eq(c).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + g + '" /></div>'); if (l.$el.trigger("onAferAppendSlide.lg", [c]), f = l.$slide.eq(c).find(".lg-object"), j && f.attr("sizes", j), i) { f.attr("srcset", i); try { picturefill({ elements: [f[0]] }) } catch (a) { console.error("Make sure you have included Picturefill version 2") } } ".lg-sub-html" !== this.s.appendSubHtmlTo && l.addHtml(c), l.$slide.eq(c).addClass("lg-loaded") }
        l.$slide.eq(c).find(".lg-object").on("load.lg error.lg", function() { var b = 0;
            e && !a("body").hasClass("lg-from-hash") && (b = e), setTimeout(function() { l.$slide.eq(c).addClass("lg-complete"), l.$el.trigger("onSlideItemLoad.lg", [c, e || 0]) }, b) }), r && r.html5 && !m && l.$slide.eq(c).addClass("lg-complete"), d === !0 && (l.$slide.eq(c).hasClass("lg-complete") ? l.preload(c) : l.$slide.eq(c).find(".lg-object").on("load.lg error.lg", function() { l.preload(c) })) }, e.prototype.slide = function(b, c, d) { var e = this.$outer.find(".lg-current").index(),
            f = this; if (!f.lGalleryOn || e !== b) { var g = this.$slide.length,
                h = f.lGalleryOn ? this.s.speed : 0,
                i = !1,
                j = !1; if (!f.lgBusy) { if (this.s.download) { var k;
                    k = f.s.dynamic ? f.s.dynamicEl[b].downloadUrl !== !1 && (f.s.dynamicEl[b].downloadUrl || f.s.dynamicEl[b].src) : "false" !== f.$items.eq(b).attr("data-download-url") && (f.$items.eq(b).attr("data-download-url") || f.$items.eq(b).attr("href") || f.$items.eq(b).attr("data-src")), k ? (a("#lg-download").attr("href", k), f.$outer.removeClass("lg-hide-download")) : f.$outer.addClass("lg-hide-download") } if (this.$el.trigger("onBeforeSlide.lg", [e, b, c, d]), f.lgBusy = !0, clearTimeout(f.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() { f.addHtml(b) }, h), this.arrowDisable(b), c) { var l = b - 1,
                        m = b + 1;
                    0 === b && e === g - 1 ? (m = 0, l = g - 1) : b === g - 1 && 0 === e && (m = 0, l = g - 1), this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"), f.$slide.eq(l).addClass("lg-prev-slide"), f.$slide.eq(m).addClass("lg-next-slide"), f.$slide.eq(b).addClass("lg-current") } else f.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), b < e ? (j = !0, 0 !== b || e !== g - 1 || d || (j = !1, i = !0)) : b > e && (i = !0, b !== g - 1 || 0 !== e || d || (j = !0, i = !1)), j ? (this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(e).addClass("lg-next-slide")) : i && (this.$slide.eq(b).addClass("lg-next-slide"), this.$slide.eq(e).addClass("lg-prev-slide")), setTimeout(function() { f.$slide.removeClass("lg-current"), f.$slide.eq(b).addClass("lg-current"), f.$outer.removeClass("lg-no-trans") }, 50);
                f.lGalleryOn ? (setTimeout(function() { f.loadContent(b, !0, 0) }, this.s.speed + 50), setTimeout(function() { f.lgBusy = !1, f.$el.trigger("onAfterSlide.lg", [e, b, c, d]) }, this.s.speed)) : (f.loadContent(b, !0, f.s.backdropDuration), f.lgBusy = !1, f.$el.trigger("onAfterSlide.lg", [e, b, c, d])), f.lGalleryOn = !0, this.s.counter && a("#lg-counter-current").text(b + 1) } } }, e.prototype.goToNextSlide = function(a) { var b = this;
        b.lgBusy || (b.index + 1 < b.$slide.length ? (b.index++, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1)) : b.s.loop ? (b.index = 0, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1)) : b.s.slideEndAnimatoin && (b.$outer.addClass("lg-right-end"), setTimeout(function() { b.$outer.removeClass("lg-right-end") }, 400))) }, e.prototype.goToPrevSlide = function(a) { var b = this;
        b.lgBusy || (b.index > 0 ? (b.index--, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1)) : b.s.loop ? (b.index = b.$items.length - 1, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1)) : b.s.slideEndAnimatoin && (b.$outer.addClass("lg-left-end"), setTimeout(function() { b.$outer.removeClass("lg-left-end") }, 400))) }, e.prototype.keyPress = function() { var c = this;
        this.$items.length > 1 && a(b).on("keyup.lg", function(a) { c.$items.length > 1 && (37 === a.keyCode && (a.preventDefault(), c.goToPrevSlide()), 39 === a.keyCode && (a.preventDefault(), c.goToNextSlide())) }), a(b).on("keydown.lg", function(a) { c.s.escKey === !0 && 27 === a.keyCode && (a.preventDefault(), c.$outer.hasClass("lg-thumb-open") ? c.$outer.removeClass("lg-thumb-open") : c.destroy()) }) }, e.prototype.arrow = function() { var a = this;
        this.$outer.find(".lg-prev").on("click.lg", function() { a.goToPrevSlide() }), this.$outer.find(".lg-next").on("click.lg", function() { a.goToNextSlide() }) }, e.prototype.arrowDisable = function(a) {!this.s.loop && this.s.hideControlOnEnd && (a + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), a > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled")) }, e.prototype.setTranslate = function(a, b, c) { this.s.useLeft ? a.css("left", b) : a.css({ transform: "translate3d(" + b + "px, " + c + "px, 0px)" }) }, e.prototype.touchMove = function(b, c) { var d = c - b;
        Math.abs(d) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), d, 0), this.setTranslate(a(".lg-prev-slide"), -this.$slide.eq(this.index).width() + d, 0), this.setTranslate(a(".lg-next-slide"), this.$slide.eq(this.index).width() + d, 0)) }, e.prototype.touchEnd = function(a) { var b = this; "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() { b.$outer.removeClass("lg-dragging"), a < 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToNextSlide(!0) : a > 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToPrevSlide(!0) : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"), b.$slide.removeAttr("style") }), setTimeout(function() { b.$outer.hasClass("lg-dragging") || "lg-slide" === b.s.mode || b.$outer.removeClass("lg-slide") }, b.s.speed + 100) }, e.prototype.enableSwipe = function() { var a = this,
            b = 0,
            c = 0,
            d = !1;
        a.s.enableSwipe && a.isTouch && a.doCss() && (a.$slide.on("touchstart.lg", function(c) { a.$outer.hasClass("lg-zoomed") || a.lgBusy || (c.preventDefault(), a.manageSwipeClass(), b = c.originalEvent.targetTouches[0].pageX) }), a.$slide.on("touchmove.lg", function(e) { a.$outer.hasClass("lg-zoomed") || (e.preventDefault(), c = e.originalEvent.targetTouches[0].pageX, a.touchMove(b, c), d = !0) }), a.$slide.on("touchend.lg", function() { a.$outer.hasClass("lg-zoomed") || (d ? (d = !1, a.touchEnd(c - b)) : a.$el.trigger("onSlideClick.lg")) })) }, e.prototype.enableDrag = function() { var c = this,
            d = 0,
            e = 0,
            f = !1,
            g = !1;
        c.s.enableDrag && !c.isTouch && c.doCss() && (c.$slide.on("mousedown.lg", function(b) { c.$outer.hasClass("lg-zoomed") || (a(b.target).hasClass("lg-object") || a(b.target).hasClass("lg-video-play")) && (b.preventDefault(), c.lgBusy || (c.manageSwipeClass(), d = b.pageX, f = !0, c.$outer.scrollLeft += 1, c.$outer.scrollLeft -= 1, c.$outer.removeClass("lg-grab").addClass("lg-grabbing"), c.$el.trigger("onDragstart.lg"))) }), a(b).on("mousemove.lg", function(a) { f && (g = !0, e = a.pageX, c.touchMove(d, e), c.$el.trigger("onDragmove.lg")) }), a(b).on("mouseup.lg", function(b) { g ? (g = !1, c.touchEnd(e - d), c.$el.trigger("onDragend.lg")) : (a(b.target).hasClass("lg-object") || a(b.target).hasClass("lg-video-play")) && c.$el.trigger("onSlideClick.lg"), f && (f = !1, c.$outer.removeClass("lg-grabbing").addClass("lg-grab")) })) }, e.prototype.manageSwipeClass = function() { var a = this.index + 1,
            b = this.index - 1,
            c = this.$slide.length;
        this.s.loop && (0 === this.index ? b = c - 1 : this.index === c - 1 && (a = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(a).addClass("lg-next-slide") }, e.prototype.mousewheel = function() { var a = this;
        a.$outer.on("mousewheel.lg", function(b) { b.deltaY && (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(), b.preventDefault()) }) }, e.prototype.closeGallery = function() { var b = this,
            c = !1;
        this.$outer.find(".lg-close").on("click.lg", function() { b.destroy() }), b.s.closable && (b.$outer.on("mousedown.lg", function(b) { c = !!(a(b.target).is(".lg-outer") || a(b.target).is(".lg-item ") || a(b.target).is(".lg-img-wrap")) }), b.$outer.on("mouseup.lg", function(d) {
            (a(d.target).is(".lg-outer") || a(d.target).is(".lg-item ") || a(d.target).is(".lg-img-wrap") && c) && (b.$outer.hasClass("lg-dragging") || b.destroy()) })) }, e.prototype.destroy = function(c) { var d = this;
        c || d.$el.trigger("onBeforeClose.lg"), a(b).scrollTop(d.prevScrollTop), c && (d.s.dynamic || this.$items.off("click.lg click.lgcustom"), a.removeData(d.el, "lightGallery")), this.$el.off(".lg.tm"), a.each(a.fn.lightGallery.modules, function(a) { d.modules[a] && d.modules[a].destroy() }), this.lGalleryOn = !1, clearTimeout(d.hideBartimeout), this.hideBartimeout = !1, a(b).off(".lg"), a("body").removeClass("lg-on lg-from-hash"), d.$outer && d.$outer.removeClass("lg-visible"), a(".lg-backdrop").removeClass("in"), setTimeout(function() { d.$outer && d.$outer.remove(), a(".lg-backdrop").remove(), c || d.$el.trigger("onCloseAfter.lg") }, d.s.backdropDuration + 50) }, a.fn.lightGallery = function(b) { return this.each(function() { if (a.data(this, "lightGallery")) try { a(this).data("lightGallery").init() } catch (a) { console.error("lightGallery has not initiated properly") } else a.data(this, "lightGallery", new e(this, b)) }) }, a.fn.lightGallery.modules = {} }(jQuery, window, document),
function(a, b, c, d) { "use strict"; var e = { autoplay: !1, pause: 5e3, progressBar: !0, fourceAutoplay: !1, autoplayControls: !0, appendAutoplayControlsTo: ".lg-toolbar" },
        f = function(b) { return this.core = a(b).data("lightGallery"), this.$el = a(b), !(this.core.$items.length < 2) && (this.core.s = a.extend({}, e, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this) };
    f.prototype.init = function() { var a = this;
        a.core.s.autoplayControls && a.controls(), a.core.s.progressBar && a.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), a.progress(), a.core.s.autoplay && a.startlAuto(), a.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() { a.interval && (a.cancelAuto(), a.canceledOnTouch = !0) }), a.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {!a.interval && a.canceledOnTouch && (a.startlAuto(), a.canceledOnTouch = !1) }) }, f.prototype.progress = function() { var a, b, c = this;
        c.$el.on("onBeforeSlide.lg.tm", function() { c.core.s.progressBar && c.fromAuto && (a = c.core.$outer.find(".lg-progress-bar"), b = c.core.$outer.find(".lg-progress"), c.interval && (b.removeAttr("style"), a.removeClass("lg-start"), setTimeout(function() { b.css("transition", "width " + (c.core.s.speed + c.core.s.pause) + "ms ease 0s"), a.addClass("lg-start") }, 20))), c.fromAuto || c.core.s.fourceAutoplay || c.cancelAuto(), c.fromAuto = !1 }) }, f.prototype.controls = function() { var b = this,
            c = '<span class="lg-autoplay-button lg-icon"></span>';
        a(this.core.s.appendAutoplayControlsTo).append(c), b.core.$outer.find(".lg-autoplay-button").on("click.lg", function() { a(b.core.$outer).hasClass("lg-show-autoplay") ? (b.cancelAuto(), b.core.s.fourceAutoplay = !1) : b.interval || (b.startlAuto(), b.core.s.fourceAutoplay = b.fourceAutoplayTemp) }) }, f.prototype.startlAuto = function() { var a = this;
        a.core.$outer.find(".lg-progress").css("transition", "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"), a.core.$outer.addClass("lg-show-autoplay"), a.core.$outer.find(".lg-progress-bar").addClass("lg-start"), a.interval = setInterval(function() { a.core.index + 1 < a.core.$items.length ? a.core.index++ : a.core.index = 0, a.fromAuto = !0, a.core.slide(a.core.index, !1, !1) }, a.core.s.speed + a.core.s.pause) }, f.prototype.cancelAuto = function() { clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start") }, f.prototype.destroy = function() { this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove() }, a.fn.lightGallery.modules.autoplay = f }(jQuery, window, document),
function(a, b, c, d) { "use strict"; var e = { fullScreen: !0 },
        f = function(b) { return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.init(), this };
    f.prototype.init = function() { var a = ""; if (this.core.s.fullScreen) { if (!(c.fullscreenEnabled || c.webkitFullscreenEnabled || c.mozFullScreenEnabled || c.msFullscreenEnabled)) return;
            a = '<span class="lg-fullscreen lg-icon"></span>', this.core.$outer.find(".lg-toolbar").append(a), this.fullScreen() } }, f.prototype.requestFullscreen = function() { var a = c.documentElement;
        a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen() }, f.prototype.exitFullscreen = function() { c.exitFullscreen ? c.exitFullscreen() : c.msExitFullscreen ? c.msExitFullscreen() : c.mozCancelFullScreen ? c.mozCancelFullScreen() : c.webkitExitFullscreen && c.webkitExitFullscreen() }, f.prototype.fullScreen = function() { var b = this;
        a(c).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() { b.core.$outer.toggleClass("lg-fullscreen-on") }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() { c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement || c.msFullscreenElement ? b.exitFullscreen() : b.requestFullscreen() }) }, f.prototype.destroy = function() { this.exitFullscreen(), a(c).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg") }, a.fn.lightGallery.modules.fullscreen = f }(jQuery, window, document),
function(a, b, c, d) { "use strict"; var e = { pager: !1 },
        f = function(b) { return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.core.s.pager && this.core.$items.length > 1 && this.init(), this };
    f.prototype.init = function() { var b, c, d, e = this,
            f = ""; if (e.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), e.core.s.dynamic)
            for (var g = 0; g < e.core.s.dynamicEl.length; g++) f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + e.core.s.dynamicEl[g].thumb + '" /></div></span>';
        else e.core.$items.each(function() { f += e.core.s.exThumbImage ? '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).attr(e.core.s.exThumbImage) + '" /></div></span>' : '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).find("img").attr("src") + '" /></div></span>' });
        c = e.core.$outer.find(".lg-pager-outer"), c.html(f), b = e.core.$outer.find(".lg-pager-cont"), b.on("click.lg touchend.lg", function() { var b = a(this);
            e.core.index = b.index(), e.core.slide(e.core.index, !1, !1) }), c.on("mouseover.lg", function() { clearTimeout(d), c.addClass("lg-pager-hover") }), c.on("mouseout.lg", function() { d = setTimeout(function() { c.removeClass("lg-pager-hover") }) }), e.core.$el.on("onBeforeSlide.lg.tm", function(a, c, d) { b.removeClass("lg-pager-active"), b.eq(d).addClass("lg-pager-active") }) }, f.prototype.destroy = function() {}, a.fn.lightGallery.modules.pager = f }(jQuery, window, document),
function(a, b, c, d) { "use strict"; var e = { thumbnail: !0, animateThumb: !0, currentPagerPosition: "middle", thumbWidth: 100, thumbContHeight: 100, thumbMargin: 5, exThumbImage: !1, showThumbByDefault: !0, toogleThumb: !0, pullCaptionUp: !0, enableThumbDrag: !0, enableThumbSwipe: !0, swipeThreshold: 50, loadYoutubeThumbnail: !0, youtubeThumbSize: 1, loadVimeoThumbnail: !0, vimeoThumbSize: "thumbnail_small", loadDailymotionThumbnail: !0 },
        f = function(b) { return this.core = a(b).data("lightGallery"), this.core.s = a.extend({}, e, this.core.s), this.$el = a(b), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.left = 0, this.init(), this };
    f.prototype.init = function() { var a = this;
        this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function() { a.core.$outer.addClass("lg-thumb-open") }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb ? (this.core.s.enableThumbDrag && !this.core.isTouch && this.core.doCss() && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.core.isTouch && this.core.doCss() && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress()) }, f.prototype.build = function() {
        function c(a, b, c) { var d, h = e.core.isVideo(a, c) || {},
                i = "";
            h.youtube || h.vimeo || h.dailymotion ? h.youtube ? d = e.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + h.youtube[1] + "/" + e.core.s.youtubeThumbSize + ".jpg" : b : h.vimeo ? e.core.s.loadVimeoThumbnail ? (d = "//i.vimeocdn.com/video/error_" + g + ".jpg", i = h.vimeo[1]) : d = b : h.dailymotion && (d = e.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + h.dailymotion[1] : b) : d = b, f += '<div data-vimeo-id="' + i + '" class="lg-thumb-item" style="width:' + e.core.s.thumbWidth + "px; margin-right: " + e.core.s.thumbMargin + 'px"><img src="' + d + '" /></div>', i = "" } var d, e = this,
            f = "",
            g = "",
            h = '<div class="lg-thumb-outer"><div class="lg-thumb group"></div></div>'; switch (this.core.s.vimeoThumbSize) {
            case "thumbnail_large":
                g = "640"; break;
            case "thumbnail_medium":
                g = "200x150"; break;
            case "thumbnail_small":
                g = "100x75" } if (e.core.$outer.addClass("lg-has-thumb"), e.core.$outer.find(".lg").append(h), e.$thumbOuter = e.core.$outer.find(".lg-thumb-outer"), e.thumbOuterWidth = e.$thumbOuter.width(), e.core.s.animateThumb && e.core.$outer.find(".lg-thumb").css({ width: e.thumbTotalWidth + "px", position: "relative" }), this.core.s.animateThumb && e.$thumbOuter.css("height", e.core.s.thumbContHeight + "px"), e.core.s.dynamic)
            for (var i = 0; i < e.core.s.dynamicEl.length; i++) c(e.core.s.dynamicEl[i].src, e.core.s.dynamicEl[i].thumb, i);
        else e.core.$items.each(function(b) { e.core.s.exThumbImage ? c(a(this).attr("href") || a(this).attr("data-src"), a(this).attr(e.core.s.exThumbImage), b) : c(a(this).attr("href") || a(this).attr("data-src"), a(this).find("img").attr("src"), b) });
        e.core.$outer.find(".lg-thumb").html(f), d = e.core.$outer.find(".lg-thumb-item"), d.each(function() { var b = a(this),
                c = b.attr("data-vimeo-id");
            c && a.getJSON("//www.vimeo.com/api/v2/video/" + c + ".json?callback=?", { format: "json" }, function(a) { b.find("img").attr("src", a[0][e.core.s.vimeoThumbSize]) }) }), d.eq(e.core.index).addClass("active"), e.core.$el.on("onBeforeSlide.lg.tm", function() { d.removeClass("active"), d.eq(e.core.index).addClass("active") }), d.on("click.lg touchend.lg", function() { var b = a(this);
            setTimeout(function() {
                (e.thumbClickable && !e.core.lgBusy || !e.core.doCss()) && (e.core.index = b.index(), e.core.slide(e.core.index, !1, !0)) }, 50) }), e.core.$el.on("onBeforeSlide.lg.tm", function() { e.animateThumb(e.core.index) }), a(b).on("resize.lg.thumb orientationchange.lg.thumb", function() { setTimeout(function() { e.animateThumb(e.core.index), e.thumbOuterWidth = e.$thumbOuter.width() }, 200) }) }, f.prototype.setTranslate = function(a) { this.core.$outer.find(".lg-thumb").css({ transform: "translate3d(-" + a + "px, 0px, 0px)" }) }, f.prototype.animateThumb = function(a) { var b = this.core.$outer.find(".lg-thumb"); if (this.core.s.animateThumb) { var c; switch (this.core.s.currentPagerPosition) {
                case "left":
                    c = 0; break;
                case "middle":
                    c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2; break;
                case "right":
                    c = this.thumbOuterWidth - this.core.s.thumbWidth }
            this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (b.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || b.animate({ left: -this.left + "px" }, this.core.s.speed)) : this.core.doCss() || b.css("left", -this.left + "px"), this.setTranslate(this.left) } }, f.prototype.enableThumbDrag = function() { var c = this,
            d = 0,
            e = 0,
            f = !1,
            g = !1,
            h = 0;
        c.$thumbOuter.addClass("lg-grab"), c.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(a) { c.thumbTotalWidth > c.thumbOuterWidth && (a.preventDefault(), d = a.pageX, f = !0, c.core.$outer.scrollLeft += 1, c.core.$outer.scrollLeft -= 1, c.thumbClickable = !1, c.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing")) }), a(b).on("mousemove.lg.thumb", function(a) { f && (h = c.left, g = !0, e = a.pageX, c.$thumbOuter.addClass("lg-dragging"), h -= e - d, h > c.thumbTotalWidth - c.thumbOuterWidth && (h = c.thumbTotalWidth - c.thumbOuterWidth), h < 0 && (h = 0), c.setTranslate(h)) }), a(b).on("mouseup.lg.thumb", function() { g ? (g = !1, c.$thumbOuter.removeClass("lg-dragging"), c.left = h, Math.abs(e - d) < c.core.s.swipeThreshold && (c.thumbClickable = !0)) : c.thumbClickable = !0, f && (f = !1, c.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab")) }) }, f.prototype.enableThumbSwipe = function() { var a = this,
            b = 0,
            c = 0,
            d = !1,
            e = 0;
        a.core.$outer.find(".lg-thumb").on("touchstart.lg", function(c) { a.thumbTotalWidth > a.thumbOuterWidth && (c.preventDefault(), b = c.originalEvent.targetTouches[0].pageX, a.thumbClickable = !1) }), a.core.$outer.find(".lg-thumb").on("touchmove.lg", function(f) { a.thumbTotalWidth > a.thumbOuterWidth && (f.preventDefault(), c = f.originalEvent.targetTouches[0].pageX, d = !0, a.$thumbOuter.addClass("lg-dragging"), e = a.left, e -= c - b, e > a.thumbTotalWidth - a.thumbOuterWidth && (e = a.thumbTotalWidth - a.thumbOuterWidth), e < 0 && (e = 0), a.setTranslate(e)) }), a.core.$outer.find(".lg-thumb").on("touchend.lg", function() { a.thumbTotalWidth > a.thumbOuterWidth && d ? (d = !1, a.$thumbOuter.removeClass("lg-dragging"), Math.abs(c - b) < a.core.s.swipeThreshold && (a.thumbClickable = !0), a.left = e) : a.thumbClickable = !0 }) }, f.prototype.toogle = function() { var a = this;
        a.core.s.toogleThumb && (a.core.$outer.addClass("lg-can-toggle"), a.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() { a.core.$outer.toggleClass("lg-thumb-open") })) }, f.prototype.thumbkeyPress = function() { var c = this;
        a(b).on("keydown.lg.thumb", function(a) { 38 === a.keyCode ? (a.preventDefault(), c.core.$outer.addClass("lg-thumb-open")) : 40 === a.keyCode && (a.preventDefault(), c.core.$outer.removeClass("lg-thumb-open")) }) }, f.prototype.destroy = function() { this.core.s.thumbnail && this.core.$items.length > 1 && (a(b).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb")) }, a.fn.lightGallery.modules.Thumbnail = f }(jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = { videoMaxWidth: "855px", youtubePlayerParams: !1, vimeoPlayerParams: !1, dailymotionPlayerParams: !1, vkPlayerParams: !1, videojs: !1, videojsOptions: {} },
        f = function(b) { return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.videoLoaded = !1, this.init(), this };
    f.prototype.init = function() {
        var b = this;
        b.core.$el.on("hasVideo.lg.tm", function(a, c, d, e) { if (b.core.$slide.eq(c).find(".lg-video").append(b.loadVideo(d, "lg-object", !0, c, e)), e)
                if (b.core.s.videojs) try { videojs(b.core.$slide.eq(c).find(".lg-html5").get(0), b.core.s.videojsOptions, function() { b.videoLoaded || this.play() }) } catch (a) { console.error("Make sure you have included videojs") } else b.core.$slide.eq(c).find(".lg-html5").get(0).play() }), b.core.$el.on("onAferAppendSlide.lg.tm", function(a, c) { b.core.$slide.eq(c).find(".lg-video-cont").css("max-width", b.core.s.videoMaxWidth), b.videoLoaded = !0 });
        var c = function(a) {
            if (a.find(".lg-object").hasClass("lg-has-poster") && a.find(".lg-object").is(":visible"))
                if (a.hasClass("lg-has-video")) {
                    var c = a.find(".lg-youtube").get(0),
                        d = a.find(".lg-vimeo").get(0),
                        e = a.find(".lg-dailymotion").get(0),
                        f = a.find(".lg-html5").get(0);
                    if (c) c.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    else if (d) try { $f(d).api("play") } catch (a) { console.error("Make sure you have included froogaloop2 js") } else if (e) e.contentWindow.postMessage("play", "*");
                        else if (f)
                        if (b.core.s.videojs) try { videojs(f).play() } catch (a) { console.error("Make sure you have included videojs") } else f.play();
                    a.addClass("lg-video-playing");
                } else { a.addClass("lg-video-playing lg-has-video"); var g, h, i = function(c, d) { if (a.find(".lg-video").append(b.loadVideo(c, "", !1, b.core.index, d)), d)
                            if (b.core.s.videojs) try { videojs(b.core.$slide.eq(b.core.index).find(".lg-html5").get(0), b.core.s.videojsOptions, function() { this.play() }) } catch (a) { console.error("Make sure you have included videojs") } else b.core.$slide.eq(b.core.index).find(".lg-html5").get(0).play() };
                    b.core.s.dynamic ? (g = b.core.s.dynamicEl[b.core.index].src, h = b.core.s.dynamicEl[b.core.index].html, i(g, h)) : (g = b.core.$items.eq(b.core.index).attr("href") || b.core.$items.eq(b.core.index).attr("data-src"), h = b.core.$items.eq(b.core.index).attr("data-html"), i(g, h)); var j = a.find(".lg-object");
                    a.find(".lg-video").append(j), a.find(".lg-video-object").hasClass("lg-html5") || (a.removeClass("lg-complete"), a.find(".lg-video-object").on("load.lg error.lg", function() { a.addClass("lg-complete") })) }
        };
        b.core.doCss() && b.core.$items.length > 1 && (b.core.s.enableSwipe && b.core.isTouch || b.core.s.enableDrag && !b.core.isTouch) ? b.core.$el.on("onSlideClick.lg.tm", function() { var a = b.core.$slide.eq(b.core.index);
            c(a) }) : b.core.$slide.on("click.lg", function() { c(a(this)) }), b.core.$el.on("onBeforeSlide.lg.tm", function(c, d, e) { var f = b.core.$slide.eq(d),
                g = f.find(".lg-youtube").get(0),
                h = f.find(".lg-vimeo").get(0),
                i = f.find(".lg-dailymotion").get(0),
                j = f.find(".lg-vk").get(0),
                k = f.find(".lg-html5").get(0); if (g) g.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
            else if (h) try { $f(h).api("pause") } catch (a) { console.error("Make sure you have included froogaloop2 js") } else if (i) i.contentWindow.postMessage("pause", "*");
                else if (k)
                if (b.core.s.videojs) try { videojs(k).pause() } catch (a) { console.error("Make sure you have included videojs") } else k.pause();
            j && a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay")); var l;
            l = b.core.s.dynamic ? b.core.s.dynamicEl[e].src : b.core.$items.eq(e).attr("href") || b.core.$items.eq(e).attr("data-src"); var m = b.core.isVideo(l, e) || {};
            (m.youtube || m.vimeo || m.dailymotion || m.vk) && b.core.$outer.addClass("lg-hide-download") }), b.core.$el.on("onAfterSlide.lg.tm", function(a, c) { b.core.$slide.eq(c).removeClass("lg-video-playing") })
    }, f.prototype.loadVideo = function(b, c, d, e, f) { var g = "",
            h = 1,
            i = "",
            j = this.core.isVideo(b, e) || {}; if (d && (h = this.videoLoaded ? 0 : 1), j.youtube) i = "?wmode=opaque&autoplay=" + h + "&enablejsapi=1", this.core.s.youtubePlayerParams && (i = i + "&" + a.param(this.core.s.youtubePlayerParams)), g = '<iframe class="lg-video-object lg-youtube ' + c + '" width="560" height="315" src="//www.youtube.com/embed/' + j.youtube[1] + i + '" frameborder="0" allowfullscreen></iframe>';
        else if (j.vimeo) i = "?autoplay=" + h + "&api=1", this.core.s.vimeoPlayerParams && (i = i + "&" + a.param(this.core.s.vimeoPlayerParams)), g = '<iframe class="lg-video-object lg-vimeo ' + c + '" width="560" height="315"  src="//player.vimeo.com/video/' + j.vimeo[1] + i + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
        else if (j.dailymotion) i = "?wmode=opaque&autoplay=" + h + "&api=postMessage", this.core.s.dailymotionPlayerParams && (i = i + "&" + a.param(this.core.s.dailymotionPlayerParams)), g = '<iframe class="lg-video-object lg-dailymotion ' + c + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + j.dailymotion[1] + i + '" frameborder="0" allowfullscreen></iframe>';
        else if (j.html5) { var k = f.substring(0, 1); "." !== k && "#" !== k || (f = a(f).html()), g = f } else j.vk && (i = "&autoplay=" + h, this.core.s.vkPlayerParams && (i = i + "&" + a.param(this.core.s.vkPlayerParams)), g = '<iframe class="lg-video-object lg-vk ' + c + '" width="560" height="315" src="http://vk.com/video_ext.php?' + j.vk[1] + i + '" frameborder="0" allowfullscreen></iframe>'); return g }, f.prototype.destroy = function() { this.videoLoaded = !1 }, a.fn.lightGallery.modules.video = f
}(jQuery, window, document),
function(a, b, c, d) { "use strict"; var e = { scale: 1, zoom: !0, actualSize: !0, enableZoomAfter: 300 },
        f = function(c) { return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, e, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = a(b).width() / 2, this.pageY = a(b).height() / 2 + a(b).scrollTop()), this };
    f.prototype.init = function() { var c = this,
            d = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
        c.core.s.actualSize && (d += '<span id="lg-actual-size" class="lg-icon"></span>'), this.core.$outer.find(".lg-toolbar").append(d), c.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(b, d, e) { var f = c.core.s.enableZoomAfter + e;
            a("body").hasClass("lg-from-hash") && e ? f = 0 : a("body").removeClass("lg-from-hash"), c.zoomabletimeout = setTimeout(function() { c.core.$slide.eq(d).addClass("lg-zoomable") }, f + 30) }); var e = 1,
            f = function(d) { var e, f, g = c.core.$outer.find(".lg-current .lg-image"),
                    h = (a(b).width() - g.width()) / 2,
                    i = (a(b).height() - g.height()) / 2 + a(b).scrollTop();
                e = c.pageX - h, f = c.pageY - i; var j = (d - 1) * e,
                    k = (d - 1) * f;
                g.css("transform", "scale3d(" + d + ", " + d + ", 1)").attr("data-scale", d), g.parent().css({ left: -j + "px", top: -k + "px" }).attr("data-x", j).attr("data-y", k) },
            g = function() { e > 1 ? c.core.$outer.addClass("lg-zoomed") : c.resetZoom(), e < 1 && (e = 1), f(e) },
            h = function(d, f, h, i) { var j, k = f.width();
                j = c.core.s.dynamic ? c.core.s.dynamicEl[h].width || f[0].naturalWidth || k : c.core.$items.eq(h).attr("data-width") || f[0].naturalWidth || k; var l;
                c.core.$outer.hasClass("lg-zoomed") ? e = 1 : j > k && (l = j / k, e = l || 2), i ? (c.pageX = a(b).width() / 2, c.pageY = a(b).height() / 2 + a(b).scrollTop()) : (c.pageX = d.pageX || d.originalEvent.targetTouches[0].pageX, c.pageY = d.pageY || d.originalEvent.targetTouches[0].pageY), g(), setTimeout(function() { c.core.$outer.removeClass("lg-grabbing").addClass("lg-grab") }, 10) },
            i = !1;
        c.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(a, b) { var d = c.core.$slide.eq(b).find(".lg-image");
            d.on("dblclick", function(a) { h(a, d, b) }), d.on("touchstart", function(a) { i ? (clearTimeout(i), i = null, h(a, d, b)) : i = setTimeout(function() { i = null }, 300), a.preventDefault() }) }), a(b).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() { c.pageX = a(b).width() / 2, c.pageY = a(b).height() / 2 + a(b).scrollTop(), f(e) }), a("#lg-zoom-out").on("click.lg", function() { c.core.$outer.find(".lg-current .lg-image").length && (e -= c.core.s.scale, g()) }), a("#lg-zoom-in").on("click.lg", function() { c.core.$outer.find(".lg-current .lg-image").length && (e += c.core.s.scale, g()) }), a("#lg-actual-size").on("click.lg", function(a) { h(a, c.core.$slide.eq(c.core.index).find(".lg-image"), c.core.index, !0) }), c.core.$el.on("onBeforeSlide.lg.tm", function() { e = 1, c.resetZoom() }), c.core.isTouch || c.zoomDrag(), c.core.isTouch && c.zoomSwipe() }, f.prototype.resetZoom = function() { this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = a(b).width() / 2, this.pageY = a(b).height() / 2 + a(b).scrollTop() }, f.prototype.zoomSwipe = function() { var a = this,
            b = {},
            c = {},
            d = !1,
            e = !1,
            f = !1;
        a.core.$slide.on("touchstart.lg", function(c) { if (a.core.$outer.hasClass("lg-zoomed")) { var d = a.core.$slide.eq(a.core.index).find(".lg-object");
                f = d.outerHeight() * d.attr("data-scale") > a.core.$outer.find(".lg").height(), e = d.outerWidth() * d.attr("data-scale") > a.core.$outer.find(".lg").width(), (e || f) && (c.preventDefault(), b = { x: c.originalEvent.targetTouches[0].pageX, y: c.originalEvent.targetTouches[0].pageY }) } }), a.core.$slide.on("touchmove.lg", function(g) { if (a.core.$outer.hasClass("lg-zoomed")) { var h, i, j = a.core.$slide.eq(a.core.index).find(".lg-img-wrap");
                g.preventDefault(), d = !0, c = { x: g.originalEvent.targetTouches[0].pageX, y: g.originalEvent.targetTouches[0].pageY }, a.core.$outer.addClass("lg-zoom-dragging"), i = f ? -Math.abs(j.attr("data-y")) + (c.y - b.y) : -Math.abs(j.attr("data-y")), h = e ? -Math.abs(j.attr("data-x")) + (c.x - b.x) : -Math.abs(j.attr("data-x")), (Math.abs(c.x - b.x) > 15 || Math.abs(c.y - b.y) > 15) && j.css({ left: h + "px", top: i + "px" }) } }), a.core.$slide.on("touchend.lg", function() { a.core.$outer.hasClass("lg-zoomed") && d && (d = !1, a.core.$outer.removeClass("lg-zoom-dragging"), a.touchendZoom(b, c, e, f)) }) }, f.prototype.zoomDrag = function() { var c = this,
            d = {},
            e = {},
            f = !1,
            g = !1,
            h = !1,
            i = !1;
        c.core.$slide.on("mousedown.lg.zoom", function(b) { var e = c.core.$slide.eq(c.core.index).find(".lg-object");
            i = e.outerHeight() * e.attr("data-scale") > c.core.$outer.find(".lg").height(), h = e.outerWidth() * e.attr("data-scale") > c.core.$outer.find(".lg").width(), c.core.$outer.hasClass("lg-zoomed") && a(b.target).hasClass("lg-object") && (h || i) && (b.preventDefault(), d = { x: b.pageX, y: b.pageY }, f = !0, c.core.$outer.scrollLeft += 1, c.core.$outer.scrollLeft -= 1, c.core.$outer.removeClass("lg-grab").addClass("lg-grabbing")) }), a(b).on("mousemove.lg.zoom", function(a) { if (f) { var b, j, k = c.core.$slide.eq(c.core.index).find(".lg-img-wrap");
                g = !0, e = { x: a.pageX, y: a.pageY }, c.core.$outer.addClass("lg-zoom-dragging"), j = i ? -Math.abs(k.attr("data-y")) + (e.y - d.y) : -Math.abs(k.attr("data-y")), b = h ? -Math.abs(k.attr("data-x")) + (e.x - d.x) : -Math.abs(k.attr("data-x")), k.css({ left: b + "px", top: j + "px" }) } }), a(b).on("mouseup.lg.zoom", function(a) { f && (f = !1, c.core.$outer.removeClass("lg-zoom-dragging"), !g || d.x === e.x && d.y === e.y || (e = { x: a.pageX, y: a.pageY }, c.touchendZoom(d, e, h, i)), g = !1), c.core.$outer.removeClass("lg-grabbing").addClass("lg-grab") }) }, f.prototype.touchendZoom = function(a, b, c, d) { var e = this,
            f = e.core.$slide.eq(e.core.index).find(".lg-img-wrap"),
            g = e.core.$slide.eq(e.core.index).find(".lg-object"),
            h = -Math.abs(f.attr("data-x")) + (b.x - a.x),
            i = -Math.abs(f.attr("data-y")) + (b.y - a.y),
            j = (e.core.$outer.find(".lg").height() - g.outerHeight()) / 2,
            k = Math.abs(g.outerHeight() * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").height() + j),
            l = (e.core.$outer.find(".lg").width() - g.outerWidth()) / 2,
            m = Math.abs(g.outerWidth() * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").width() + l);
        (Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) && (d && (i <= -k ? i = -k : i >= -j && (i = -j)), c && (h <= -m ? h = -m : h >= -l && (h = -l)), d ? f.attr("data-y", Math.abs(i)) : i = -Math.abs(f.attr("data-y")), c ? f.attr("data-x", Math.abs(h)) : h = -Math.abs(f.attr("data-x")), f.css({ left: h + "px", top: i + "px" })) }, f.prototype.destroy = function() { var c = this;
        c.core.$el.off(".lg.zoom"), a(b).off(".lg.zoom"), c.core.$slide.off(".lg.zoom"), c.core.$el.off(".lg.tm.zoom"), c.resetZoom(), clearTimeout(c.zoomabletimeout), c.zoomabletimeout = !1 }, a.fn.lightGallery.modules.zoom = f }(jQuery, window, document),
function(a, b, c, d) { "use strict"; var e = { hash: !0 },
        f = function(c) { return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, e, this.core.s), this.core.s.hash && (this.oldHash = b.location.hash, this.init()), this };
    f.prototype.init = function() { var c, d = this;
        d.core.$el.on("onAfterSlide.lg.tm", function(a, c, e) { b.location.hash = "lg=" + d.core.s.galleryId + "&slide=" + e }), a(b).on("hashchange.lg.hash", function() { c = b.location.hash; var a = parseInt(c.split("&slide=")[1], 10);
            c.indexOf("lg=" + d.core.s.galleryId) > -1 ? d.core.slide(a, !1, !1) : d.core.lGalleryOn && d.core.destroy() }) }, f.prototype.destroy = function() { this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? b.location.hash = this.oldHash : history.pushState ? history.pushState("", c.title, b.location.pathname + b.location.search) : b.location.hash = "", this.core.$el.off(".lg.hash")) }, a.fn.lightGallery.modules.hash = f }(jQuery, window, document);


/*
 * jQuery FlexSlider v2.6.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function($) { var e = !0;
    $.flexslider = function(t, a) { var n = $(t);
        n.vars = $.extend({}, $.flexslider.defaults, a); var i = n.vars.namespace,
            s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            r = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
            o = "click touchend MSPointerUp keyup",
            l = "",
            c, d = "vertical" === n.vars.direction,
            u = n.vars.reverse,
            v = n.vars.itemWidth > 0,
            p = "fade" === n.vars.animation,
            m = "" !== n.vars.asNavFor,
            f = {};
        $.data(t, "flexslider", n), f = { init: function() { n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = $(n.vars.selector, n), n.container = $(n.containerSelector, n), n.count = n.slides.length, n.syncExists = $(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = d ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && function() { var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]; for (var a in t)
                        if (void 0 !== e.style[t[a]]) return n.pfx = t[a].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                    return !1 }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = $(n.vars.controlsContainer).length > 0 && $(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = $(n.vars.manualControls).length > 0 && $(n.vars.manualControls)), "" !== n.vars.customDirectionNav && (n.customDirectionNav = 2 === $(n.vars.customDirectionNav).length && $(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(function() { return Math.round(Math.random()) - .5 }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && f.controlNav.setup(), n.vars.directionNav && f.directionNav.setup(), n.vars.keyboard && (1 === $(n.containerSelector).length || n.vars.multipleKeyboard) && $(document).bind("keyup", function(e) { var t = e.keyCode; if (!n.animating && (39 === t || 37 === t)) { var a = 39 === t ? n.getTarget("next") : 37 === t ? n.getTarget("prev") : !1;
                        n.flexAnimate(a, n.vars.pauseOnAction) } }), n.vars.mousewheel && n.bind("mousewheel", function(e, t, a, i) { e.preventDefault(); var s = 0 > t ? n.getTarget("next") : n.getTarget("prev");
                    n.flexAnimate(s, n.vars.pauseOnAction) }), n.vars.pausePlay && f.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && f.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function() { n.manualPlay || n.manualPause || n.pause() }, function() { n.manualPause || n.manualPlay || n.stopped || n.play() }), n.vars.pauseInvisible && f.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), m && f.asNav.setup(), r && n.vars.touch && f.touch(), (!p || p && n.vars.smoothHeight) && $(window).bind("resize orientationchange focus", f.resize), n.find("img").attr("draggable", "false"), setTimeout(function() { n.vars.start(n) }, 200) }, asNav: { setup: function() { n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(i + "active-slide").eq(n.currentItem).addClass(i + "active-slide"), s ? (t._slider = n, n.slides.each(function() { var e = this;
                        e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(e) { e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId) }, !1), e.addEventListener("MSGestureTap", function(e) { e.preventDefault(); var t = $(this),
                                a = t.index();
                            $(n.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0)) }) })) : n.slides.on(o, function(e) { e.preventDefault(); var t = $(this),
                            a = t.index(),
                            s = t.offset().left - $(n).scrollLeft();
                        0 >= s && t.hasClass(i + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : $(n.vars.asNavFor).data("flexslider").animating || t.hasClass(i + "active-slide") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0)) }) } }, controlNav: { setup: function() { n.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging() }, setupPaging: function() { var e = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
                        t = 1,
                        a, s; if (n.controlNavScaffold = $('<ol class="' + i + "control-nav " + i + e + '"></ol>'), n.pagingCount > 1)
                        for (var r = 0; r < n.pagingCount; r++) { s = n.slides.eq(r), void 0 === s.attr("data-thumb-alt") && s.attr("data-thumb-alt", ""); var c = "" !== s.attr("data-thumb-alt") ? c = ' alt="' + s.attr("data-thumb-alt") + '"' : ""; if (a = "thumbnails" === n.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"' + c + "/>" : '<a href="#">' + t + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) { var d = s.attr("data-thumbcaption"); "" !== d && void 0 !== d && (a += '<span class="' + i + 'caption">' + d + "</span>") }
                            n.controlNavScaffold.append("<li>" + a + "</li>"), t++ }
                    n.controlsContainer ? $(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), n.controlNavScaffold.delegate("a, img", o, function(e) { if (e.preventDefault(), "" === l || l === e.type) { var t = $(this),
                                a = n.controlNav.index(t);
                            t.hasClass(i + "active") || (n.direction = a > n.currentSlide ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction)) } "" === l && (l = e.type), f.setToClearWatchedEvent() }) }, setupManual: function() { n.controlNav = n.manualControls, f.controlNav.active(), n.controlNav.bind(o, function(e) { if (e.preventDefault(), "" === l || l === e.type) { var t = $(this),
                                a = n.controlNav.index(t);
                            t.hasClass(i + "active") || (a > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(a, n.vars.pauseOnAction)) } "" === l && (l = e.type), f.setToClearWatchedEvent() }) }, set: function() { var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
                    n.controlNav = $("." + i + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n) }, active: function() { n.controlNav.removeClass(i + "active").eq(n.animatingTo).addClass(i + "active") }, update: function(e, t) { n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append($('<li><a href="#">' + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(t).closest("li").remove(), f.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(t, e) : f.controlNav.active() } }, directionNav: { setup: function() { var e = $('<ul class="' + i + 'direction-nav"><li class="' + i + 'nav-prev"><a class="' + i + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + i + 'nav-next"><a class="' + i + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                    n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? ($(n.controlsContainer).append(e), n.directionNav = $("." + i + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = $("." + i + "direction-nav li a", n)), f.directionNav.update(), n.directionNav.bind(o, function(e) { e.preventDefault(); var t;
                        ("" === l || l === e.type) && (t = $(this).hasClass(i + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(t, n.vars.pauseOnAction)), "" === l && (l = e.type), f.setToClearWatchedEvent() }) }, update: function() { var e = i + "disabled";
                    1 === n.pagingCount ? n.directionNav.addClass(e).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : n.directionNav.removeClass(e).removeAttr("tabindex") } }, pausePlay: { setup: function() { var e = $('<div class="' + i + 'pauseplay"><a href="#"></a></div>');
                    n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = $("." + i + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = $("." + i + "pauseplay a", n)), f.pausePlay.update(n.vars.slideshow ? i + "pause" : i + "play"), n.pausePlay.bind(o, function(e) { e.preventDefault(), ("" === l || l === e.type) && ($(this).hasClass(i + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === l && (l = e.type), f.setToClearWatchedEvent() }) }, update: function(e) { "play" === e ? n.pausePlay.removeClass(i + "pause").addClass(i + "play").html(n.vars.playText) : n.pausePlay.removeClass(i + "play").addClass(i + "pause").html(n.vars.pauseText) } }, touch: function() {
                function e(e) { e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), T = 0, c = d ? n.h : n.w, f = Number(new Date), l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c) }

                function a(e) { e.stopPropagation(); var a = e.target._slider; if (a) { var n = -e.translationX,
                            i = -e.translationY; return T += d ? i : n, m = T, y = d ? Math.abs(T) < Math.abs(-n) : Math.abs(T) < Math.abs(-i), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() { t._gesture.stop() }) : void((!y || Number(new Date) - f > 500) && (e.preventDefault(), !p && a.transitions && (a.vars.animationLoop || (m = T / (0 === a.currentSlide && 0 > T || a.currentSlide === a.last && T > 0 ? Math.abs(T) / c + 2 : 1)), a.setProps(l + m, "setTouch")))) } }

                function i(e) { e.stopPropagation(); var t = e.target._slider; if (t) { if (t.animatingTo === t.currentSlide && !y && null !== m) { var a = u ? -m : m,
                                n = a > 0 ? t.getTarget("next") : t.getTarget("prev");
                            t.canAdvance(n) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : p || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0) }
                        r = null, o = null, m = null, l = null, T = 0 } } var r, o, l, c, m, f, g, h, S, y = !1,
                    x = 0,
                    b = 0,
                    T = 0;
                s ? (t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", e, !1), t._slider = n, t.addEventListener("MSGestureChange", a, !1), t.addEventListener("MSGestureEnd", i, !1)) : (g = function(e) { n.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (n.pause(), c = d ? n.h : n.w, f = Number(new Date), x = e.touches[0].pageX, b = e.touches[0].pageY, l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c, r = d ? b : x, o = d ? x : b, t.addEventListener("touchmove", h, !1), t.addEventListener("touchend", S, !1)) }, h = function(e) { x = e.touches[0].pageX, b = e.touches[0].pageY, m = d ? r - b : r - x, y = d ? Math.abs(m) < Math.abs(x - o) : Math.abs(m) < Math.abs(b - o); var t = 500;
                    (!y || Number(new Date) - f > t) && (e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (m /= 0 === n.currentSlide && 0 > m || n.currentSlide === n.last && m > 0 ? Math.abs(m) / c + 2 : 1), n.setProps(l + m, "setTouch"))) }, S = function(e) { if (t.removeEventListener("touchmove", h, !1), n.animatingTo === n.currentSlide && !y && null !== m) { var a = u ? -m : m,
                            i = a > 0 ? n.getTarget("next") : n.getTarget("prev");
                        n.canAdvance(i) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? n.flexAnimate(i, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0) }
                    t.removeEventListener("touchend", S, !1), r = null, o = null, m = null, l = null }, t.addEventListener("touchstart", g, !1)) }, resize: function() {!n.animating && n.is(":visible") && (v || n.doMath(), p ? f.smoothHeight() : v ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && f.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal"))) }, smoothHeight: function(e) { if (!d || p) { var t = p ? n : n.viewport;
                    e ? t.animate({ height: n.slides.eq(n.animatingTo).innerHeight() }, e) : t.innerHeight(n.slides.eq(n.animatingTo).innerHeight()) } }, sync: function(e) { var t = $(n.vars.sync).data("flexslider"),
                    a = n.animatingTo; switch (e) {
                    case "animate":
                        t.flexAnimate(a, n.vars.pauseOnAction, !1, !0); break;
                    case "play":
                        t.playing || t.asNav || t.play(); break;
                    case "pause":
                        t.pause() } }, uniqueID: function(e) { return e.filter("[id]").add(e.find("[id]")).each(function() { var e = $(this);
                    e.attr("id", e.attr("id") + "_clone") }), e }, pauseInvisible: { visProp: null, init: function() { var e = f.pauseInvisible.getHiddenProp(); if (e) { var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function() { f.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play() }) } }, isHidden: function() { var e = f.pauseInvisible.getHiddenProp(); return e ? document[e] : !1 }, getHiddenProp: function() { var e = ["webkit", "moz", "ms", "o"]; if ("hidden" in document) return "hidden"; for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null } }, setToClearWatchedEvent: function() { clearTimeout(c), c = setTimeout(function() { l = "" }, 3e3) } }, n.flexAnimate = function(e, t, a, s, o) { if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), m && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, o) || a) && n.is(":visible")) { if (m && s) { var l = $(n.vars.asNavFor).data("flexslider"); if (n.atEnd = 0 === e || e === n.count - 1, l.flexAnimate(e, !0, !1, !0, o), n.direction = n.currentItem < e ? "next" : "prev", l.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), !1;
                    n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), e = Math.floor(e / n.visible) } if (n.animating = !0, n.animatingTo = e, t && n.pause(), n.vars.before(n), n.syncExists && !o && f.sync("animate"), n.vars.controlNav && f.controlNav.active(), v || n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && f.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p) r ? (n.slides.eq(n.currentSlide).css({ opacity: 0, zIndex: 1 }), n.slides.eq(e).css({ opacity: 1, zIndex: 2 }), n.wrapup(c)) : (n.slides.eq(n.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({ zIndex: 2 }).animate({ opacity: 1 }, n.vars.animationSpeed, n.vars.easing, n.wrapup));
                else { var c = d ? n.slides.filter(":first").height() : n.computedW,
                        g, h, S;
                    v ? (g = n.vars.itemMargin, S = (n.itemW + g) * n.move * n.animatingTo, h = S > n.limit && 1 !== n.visible ? n.limit : S) : h = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? u ? (n.count + n.cloneOffset) * c : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? u ? 0 : (n.count + 1) * c : u ? (n.count - 1 - e + n.cloneOffset) * c : (e + n.cloneOffset) * c, n.setProps(h, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function() { clearTimeout(n.ensureAnimationEnd), n.wrapup(c) }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function() { n.wrapup(c) }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function() { n.wrapup(c) }) }
                n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed) } }, n.wrapup = function(e) { p || v || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(e, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n) }, n.animateSlides = function() {!n.animating && e && n.flexAnimate(n.getTarget("next")) }, n.pause = function() { clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && f.pausePlay.update("play"), n.syncExists && f.sync("pause") }, n.play = function() { n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && f.pausePlay.update("pause"), n.syncExists && f.sync("play") }, n.stop = function() { n.pause(), n.stopped = !0 }, n.canAdvance = function(e, t) { var a = m ? n.pagingCount - 1 : n.last; return t ? !0 : m && n.currentItem === n.count - 1 && 0 === e && "prev" === n.direction ? !0 : m && 0 === n.currentItem && e === n.pagingCount - 1 && "next" !== n.direction ? !1 : e !== n.currentSlide || m ? n.vars.animationLoop ? !0 : n.atEnd && 0 === n.currentSlide && e === a && "next" !== n.direction ? !1 : n.atEnd && n.currentSlide === a && 0 === e && "next" === n.direction ? !1 : !0 : !1 }, n.getTarget = function(e) { return n.direction = e, "next" === e ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1 }, n.setProps = function(e, t, a) { var i = function() { var a = e ? e : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
                    i = function() { if (v) return "setTouch" === t ? e : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : a; switch (t) {
                            case "setTotal":
                                return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e;
                            case "setTouch":
                                return u ? e : e;
                            case "jumpEnd":
                                return u ? e : n.count * e;
                            case "jumpStart":
                                return u ? n.count * e : e;
                            default:
                                return e } }(); return -1 * i + "px" }();
            n.transitions && (i = d ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", a), n.container.css("transition-duration", a)), n.args[n.prop] = i, (n.transitions || void 0 === a) && n.container.css(n.args), n.container.css("transform", i) }, n.setup = function(e) { if (p) n.slides.css({ width: "100%", "float": "left", marginRight: "-100%", position: "relative" }), "init" === e && (r ? n.slides.css({ opacity: 0, display: "block", webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease", zIndex: 1 }).eq(n.currentSlide).css({ opacity: 1, zIndex: 2 }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(n.currentSlide).css({ zIndex: 2 }).css({ opacity: 1 }) : n.slides.css({ opacity: 0, display: "block", zIndex: 1 }).eq(n.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && f.smoothHeight();
            else { var t, a; "init" === e && (n.viewport = $('<div class="' + i + 'viewport"></div>').css({ overflow: "hidden", position: "relative" }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (a = $.makeArray(n.slides).reverse(), n.slides = $(a), n.container.empty().append(n.slides))), n.vars.animationLoop && !v && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = $(n.vars.selector, n), t = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !v ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() { n.newSlides.css({ display: "block" }), n.doMath(), n.viewport.height(n.h), n.setProps(t * n.h, "init") }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(t * n.computedW, "init"), setTimeout(function() { n.doMath(), n.newSlides.css({ width: n.computedW, marginRight: n.computedM, "float": "left", display: "block" }), n.vars.smoothHeight && f.smoothHeight() }, "init" === e ? 100 : 0)) }
            v || n.slides.removeClass(i + "active-slide").eq(n.currentSlide).addClass(i + "active-slide"), n.vars.init(n) }, n.doMath = function() { var e = n.slides.first(),
                t = n.vars.itemMargin,
                a = n.vars.minItems,
                i = n.vars.maxItems;
            n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), v ? (n.itemT = n.vars.itemWidth + t, n.itemM = t, n.minW = a ? a * n.itemT : n.w, n.maxW = i ? i * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (a - 1)) / a : n.maxW < n.w ? (n.w - t * (i - 1)) / i : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.itemM = t, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding, n.computedM = n.itemM }, n.update = function(e, t) { n.doMath(), v || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === t && !v || n.pagingCount > n.controlNav.length ? f.controlNav.update("add") : ("remove" === t && !v || n.pagingCount < n.controlNav.length) && (v && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), f.controlNav.update("remove", n.last))), n.vars.directionNav && f.directionNav.update() }, n.addSlide = function(e, t) { var a = $(e);
            n.count += 1, n.last = n.count - 1, d && u ? void 0 !== t ? n.slides.eq(n.count - t).after(a) : n.container.prepend(a) : void 0 !== t ? n.slides.eq(t).before(a) : n.container.append(a), n.update(t, "add"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n) }, n.removeSlide = function(e) { var t = isNaN(e) ? n.slides.index($(e)) : e;
            n.count -= 1, n.last = n.count - 1, isNaN(e) ? $(e, n.slides).remove() : d && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(t, "remove"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n) }, f.init() }, $(window).blur(function(t) { e = !1 }).focus(function(t) { e = !0 }), $.flexslider.defaults = { namespace: "flex-", selector: ".slides > li", animation: "fade", easing: "swing", direction: "horizontal", reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7e3, animationSpeed: 600, initDelay: 0, randomize: !1, fadeFirstSlide: !0, thumbCaptions: !1, pauseOnAction: !0, pauseOnHover: !1, pauseInvisible: !0, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: "Previous", nextText: "Next", keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: "Pause", playText: "Play", controlsContainer: "", manualControls: "", customDirectionNav: "", sync: "", asNavFor: "", itemWidth: 0, itemMargin: 0, minItems: 1, maxItems: 0, move: 0, allowOneSlide: !0, start: function() {}, before: function() {}, after: function() {}, end: function() {}, added: function() {}, removed: function() {}, init: function() {} }, $.fn.flexslider = function(e) { if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() { var t = $(this),
                a = e.selector ? e.selector : ".slides > li",
                n = t.find(a);
            1 === n.length && e.allowOneSlide === !1 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e) }); var t = $(this).data("flexslider"); switch (e) {
            case "play":
                t.play(); break;
            case "pause":
                t.pause(); break;
            case "stop":
                t.stop(); break;
            case "next":
                t.flexAnimate(t.getTarget("next"), !0); break;
            case "prev":
            case "previous":
                t.flexAnimate(t.getTarget("prev"), !0); break;
            default:
                "number" == typeof e && t.flexAnimate(e, !0) } } }(jQuery);


/**
 * Owl Carousel v2.2.0
 * Copyright 2013-2016 David Deutsch
 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
 */
! function(a, b, c, d) {
    function e(b, c) { this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null }, this._states = { current: {}, tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] } }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) { this._handlers[c] = a.proxy(this[c], this) }, this)), a.each(e.Plugins, a.proxy(function(a, b) { this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this) }, this)), a.each(e.Workers, a.proxy(function(b, c) { this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) }) }, this)), this.setup(), this.initialize() }
    e.Defaults = { items: 3, loop: !1, center: !1, rewind: !1, mouseDrag: !0, touchDrag: !0, pullDrag: !0, freeDrag: !1, margin: 0, stagePadding: 0, merge: !1, mergeFit: !0, autoWidth: !1, startPosition: 0, rtl: !1, smartSpeed: 250, fluidSpeed: !1, dragEndSpeed: !1, responsive: {}, responsiveRefreshRate: 200, responsiveBaseElement: b, fallbackEasing: "swing", info: !1, nestedItemSelector: !1, itemElement: "div", stageElement: "div", refreshClass: "owl-refresh", loadedClass: "owl-loaded", loadingClass: "owl-loading", rtlClass: "owl-rtl", responsiveClass: "owl-responsive", dragClass: "owl-drag", itemClass: "owl-item", stageClass: "owl-stage", stageOuterClass: "owl-stage-outer", grabClass: "owl-grab" }, e.Width = { Default: "default", Inner: "inner", Outer: "outer" }, e.Type = { Event: "event", State: "state" }, e.Plugins = {}, e.Workers = [{ filter: ["width", "settings"], run: function() { this._width = this.$element.width() } }, { filter: ["width", "items", "settings"], run: function(a) { a.current = this._items && this._items[this.relative(this._current)] } }, { filter: ["items", "settings"], run: function() { this.$stage.children(".cloned").remove() } }, { filter: ["width", "items", "settings"], run: function(a) { var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = { width: "auto", "margin-left": d ? b : "", "margin-right": d ? "" : b };!c && this.$stage.children().css(e), a.css = e } }, { filter: ["width", "items", "settings"], run: function(a) { var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = []; for (a.items = { merge: !1, width: b }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f } }, { filter: ["items", "settings"], run: function() { var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = ""; for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage) } }, { filter: ["width", "items", "settings"], run: function() { for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f } }, { filter: ["width", "items", "settings"], run: function() { var a = this.settings.stagePadding,
                b = this._coordinates,
                c = { width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a, "padding-left": a || "", "padding-right": a || "" };
            this.$stage.css(c) } }, { filter: ["width", "items", "settings"], run: function(a) { var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children(); if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css)) } }, { filter: ["items"], run: function() { this._coordinates.length < 1 && this.$stage.removeAttr("style") } }, { filter: ["width", "items", "settings"], run: function(a) { a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current) } }, { filter: ["position"], run: function() { this.animate(this.coordinates(this._current)) } }, { filter: ["width", "position", "items", "settings"], run: function() { var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = []; for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center")) } }], e.prototype.initialize = function() { if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) { var b, c, e;
            b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e && this.preloadAutoWidthImages(b) }
        this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized") }, e.prototype.setup = function() { var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) { b >= a && a > d && (d = Number(a)) }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", { property: { name: "settings", value: e } }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", { property: { name: "settings", value: this.settings } }) }, e.prototype.optionsLogic = function() { this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1) }, e.prototype.prepare = function(b) { var c = this.trigger("prepare", { content: b }); return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", { content: c.data }), c.data }, e.prototype.update = function() { for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) { return this[a] }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid") }, e.prototype.width = function(a) { switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin } }, e.prototype.refresh = function() { this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed") }, e.prototype.onThrottledResize = function() { b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate) }, e.prototype.onResize = function() { return this._items.length ? this._width === this.$element.width() ? !1 : this.$element.is(":visible") ? (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized"))) : !1 : !1 }, e.prototype.registerEventHandlers = function() { a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() { return !1 })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this))) }, e.prototype.onDragStart = function(b) { var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = { x: d[16 === d.length ? 12 : 4], y: d[16 === d.length ? 13 : 5] }) : (d = this.$stage.position(), d = { x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left, y: d.top }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) { var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag")) }, this))) }, e.prototype.onDragMove = function(a) { var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x)) }, e.prototype.onDragEnd = function(b) { var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() { return !1 })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged")) }, e.prototype.closest = function(b, c) { var d = -1,
            e = 30,
            f = this.width(),
            g = this.coordinates(); return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) { return "left" === c && b > h - e && h + e > b ? d = a : "right" === c && b > h - f - e && h - f + e > b ? d = a + 1 : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), -1 === d }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d }, e.prototype.animate = function(b) { var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({ transform: "translate3d(" + b + "px,0px,0px)", transition: this.speed() / 1e3 + "s" }) : c ? this.$stage.animate({ left: b + "px" }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({ left: b + "px" }) }, e.prototype.is = function(a) { return this._states.current[a] && this._states.current[a] > 0 }, e.prototype.current = function(a) { if (a === d) return this._current; if (0 === this._items.length) return d; if (a = this.normalize(a), this._current !== a) { var b = this.trigger("change", { property: { name: "position", value: a } });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } }) } return this._current }, e.prototype.invalidate = function(b) { return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) { return b }) }, e.prototype.reset = function(a) { a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"])) }, e.prototype.normalize = function(a, b) { var c = this._items.length,
            e = b ? 0 : this._clones.length; return !this.isNumeric(a) || 1 > c ? a = d : (0 > a || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a }, e.prototype.relative = function(a) { return a -= this._clones.length / 2, this.normalize(a, !0) }, e.prototype.maximum = function(a) { var b, c, d, e = this.settings,
            f = this._coordinates.length; if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
        else if (e.autoWidth || e.merge) { for (b = this._items.length, c = this._items[--b].width(), d = this.$element.width(); b-- && (c += this._items[b].width() + this.settings.margin, !(c > d)););
            f = b + 1 } else f = e.center ? this._items.length - 1 : this._items.length - e.items; return a && (f -= this._clones.length / 2), Math.max(f, 0) }, e.prototype.minimum = function(a) { return a ? 0 : this._clones.length / 2 }, e.prototype.items = function(a) { return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]) }, e.prototype.mergers = function(a) { return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]) }, e.prototype.clones = function(b) { var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) { return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2 }; return b === d ? a.map(this._clones, function(a, b) { return f(b) }) : a.map(this._clones, function(a, c) { return a === b ? f(c) : null }) }, e.prototype.speed = function(a) { return a !== d && (this._speed = a), this._speed }, e.prototype.coordinates = function(b) { var c, e = 1,
            f = b - 1; return b === d ? a.map(this._coordinates, a.proxy(function(a, b) { return this.coordinates(b) }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c)) }, e.prototype.duration = function(a, b, c) { return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed) }, e.prototype.to = function(a, b) { var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (0 > e),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && i >= d - e && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update() }, e.prototype.next = function(a) { a = a || !1, this.to(this.relative(this.current()) + 1, a) }, e.prototype.prev = function(a) { a = a || !1, this.to(this.relative(this.current()) - 1, a) }, e.prototype.onTransitionEnd = function(a) { return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.leave("animating"), void this.trigger("translated")) }, e.prototype.viewport = function() { var d; if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else { if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth } return d }, e.prototype.replace = function(b) { this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() { return 1 === this.nodeType }).each(a.proxy(function(a, b) { b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1) }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items") }, e.prototype.add = function(b, c) { var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", { content: b, position: c }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", { content: b, position: c }) }, e.prototype.remove = function(a) { a = this.normalize(a, !0), a !== d && (this.trigger("remove", { content: this._items[a], position: a }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", { content: null, position: a })) }, e.prototype.preloadAutoWidthImages = function(b) { b.each(a.proxy(function(b, c) { this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) { c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh() }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")) }, this)) }, e.prototype.destroy = function() { this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize)); for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel") }, e.prototype.op = function(a, b, c) { var d = this.settings.rtl; switch (b) {
            case "<":
                return d ? a > c : c > a;
            case ">":
                return d ? c > a : a > c;
            case ">=":
                return d ? c >= a : a >= c;
            case "<=":
                return d ? a >= c : c >= a } }, e.prototype.on = function(a, b, c, d) { a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c) }, e.prototype.off = function(a, b, c, d) { a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c) }, e.prototype.trigger = function(b, c, d, f, g) { var h = { item: { count: this._items.length, index: this.current() } },
            i = a.camelCase(a.grep(["on", b, d], function(a) { return a }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({ relatedTarget: this }, h, c)); return this._supress[b] || (a.each(this._plugins, function(a, b) { b.onTrigger && b.onTrigger(j) }), this.register({ type: e.Type.Event, name: b }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j }, e.prototype.enter = function(b) { a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) { this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++ }, this)) }, e.prototype.leave = function(b) { a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) { this._states.current[b]-- }, this)) }, e.prototype.register = function(b) { if (b.type === e.Type.Event) { if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) { var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) { return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments) }, a.event.special[b.name].owl = !0 } } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) { return a.inArray(c, this._states.tags[b.name]) === d }, this))) }, e.prototype.suppress = function(b) { a.each(b, a.proxy(function(a, b) { this._supress[b] = !0 }, this)) }, e.prototype.release = function(b) { a.each(b, a.proxy(function(a, b) { delete this._supress[b] }, this)) }, e.prototype.pointer = function(a) { var c = { x: null, y: null }; return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c }, e.prototype.isNumeric = function(a) { return !isNaN(parseFloat(a)) }, e.prototype.difference = function(a, b) { return { x: a.x - b.x, y: a.y - b.y } }, a.fn.owlCarousel = function(b) { var c = Array.prototype.slice.call(arguments, 1); return this.each(function() { var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) { f.register({ type: e.Type.Event, name: c }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) { a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c])) }, f)) })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c) }) }, a.fn.owlCarousel.Constructor = e }(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) { var e = function(b) { this._core = b, this._interval = null, this._visible = null, this._handlers = { "initialized.owl.carousel": a.proxy(function(a) { a.namespace && this._core.settings.autoRefresh && this.watch() }, this) }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers) };
    e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }, e.prototype.watch = function() { this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)) }, e.prototype.refresh = function() { this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh()) }, e.prototype.destroy = function() { var a, c;
        b.clearInterval(this._interval); for (a in this._handlers) this._core.$element.off(a, this._handlers[a]); for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null) }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e }(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) { var e = function(b) { this._core = b, this._loaded = [], this._handlers = { "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) { if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, e = c.center && Math.ceil(c.items / 2) || c.items, f = c.center && -1 * e || 0, g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f, h = this._core.clones().length, i = a.proxy(function(a, b) { this.load(b) }, this); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++ }, this) }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers) };
    e.Defaults = { lazyLoad: !1 }, e.prototype.load = function(c) { var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");!e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) { var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", { element: f, url: g }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() { f.css("opacity", 1), this._core.trigger("loaded", { element: f, url: g }, "lazy") }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() { f.css({ "background-image": "url(" + g + ")", opacity: "1" }), this._core.trigger("loaded", { element: f, url: g }, "lazy") }, this), e.src = g) }, this)), this._loaded.push(d.get(0))) }, e.prototype.destroy = function() { var a, b; for (a in this.handlers) this._core.$element.off(a, this.handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e }(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) { var e = function(b) { this._core = b, this._handlers = { "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) { a.namespace && this._core.settings.autoHeight && this.update() }, this), "changed.owl.carousel": a.proxy(function(a) { a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update() }, this), "loaded.owl.lazy": a.proxy(function(a) { a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update() }, this) }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers) };
    e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }, e.prototype.update = function() { var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.$stage.children().toArray().slice(b, c),
            e = [],
            f = 0;
        a.each(d, function(b, c) { e.push(a(c).height()) }), f = Math.max.apply(null, e), this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass) }, e.prototype.destroy = function() { var a, b; for (a in this._handlers) this._core.$element.off(a, this._handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e }(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) { var e = function(b) { this._core = b, this._videos = {}, this._playing = null, this._handlers = { "initialized.owl.carousel": a.proxy(function(a) { a.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] }) }, this), "resize.owl.carousel": a.proxy(function(a) { a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault() }, this), "refreshed.owl.carousel": a.proxy(function(a) { a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove() }, this), "changed.owl.carousel": a.proxy(function(a) { a.namespace && "position" === a.property.name && this._playing && this.stop() }, this), "prepared.owl.carousel": a.proxy(function(b) { if (b.namespace) { var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content))) } }, this) }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) { this.play(a) }, this)) };
    e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }, e.prototype.fetch = function(a, b) { var c = function() { return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube" }(),
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href"); if (!g) throw new Error("Missing video URL."); if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else { if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar" }
        d = d[6], this._videos[g] = { type: c, id: d, width: e, height: f }, b.attr("data-video", g), this.thumbnail(a, this._videos[g]) }, e.prototype.thumbnail = function(b, c) { var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) { e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e) }; return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({ type: "GET", url: "//vimeo.com/api/v2/video/" + c.id + ".json", jsonp: "callback", dataType: "jsonp", success: function(a) { f = a[0].thumbnail_large, l(f) } }) : "vzaar" === c.type && a.ajax({ type: "GET", url: "//vzaar.com/api/videos/" + c.id + ".json", jsonp: "callback", dataType: "jsonp", success: function(a) { f = a.framegrab_url, l(f) } })) }, e.prototype.stop = function() { this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video") }, e.prototype.play = function(b) { var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="//www.youtube.com/embed/' + f.id + "?autoplay=1&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type ? c = '<iframe src="//player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === f.type && (c = '<iframe frameborder="0"height="' + h + '"width="' + g + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + f.id + '/player?autoplay=true"></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing")) }, e.prototype.isInFullScreen = function() { var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement; return b && a(b).parent().hasClass("owl-video-frame") }, e.prototype.destroy = function() { var a, b;
        this._core.$element.off("click.owl.video"); for (a in this._handlers) this._core.$element.off(a, this._handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.Video = e }(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) { this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = { "change.owl.carousel": a.proxy(function(a) { a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value) }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) { a.namespace && (this.swapping = "translated" == a.type) }, this), "translate.owl.carousel": a.proxy(function(a) { a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap() }, this) }, this.core.$element.on(this.handlers) };
    e.Defaults = { animateOut: !1, animateIn: !1 }, e.prototype.swap = function() { if (1 === this.core.settings.items && a.support.animation && a.support.transition) { this.core.speed(0); var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({ left: b + "px" }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f)) } }, e.prototype.clear = function(b) { a(b.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd() }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null);
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) { var e = function(b) { this._core = b, this._timeout = null, this._paused = !1, this._handlers = { "changed.owl.carousel": a.proxy(function(a) { a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._core.settings.autoplay && this._setAutoPlayInterval() }, this), "initialized.owl.carousel": a.proxy(function(a) { a.namespace && this._core.settings.autoplay && this.play() }, this), "play.owl.autoplay": a.proxy(function(a, b, c) { a.namespace && this.play(b, c) }, this), "stop.owl.autoplay": a.proxy(function(a) { a.namespace && this.stop() }, this), "mouseover.owl.autoplay": a.proxy(function() { this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause() }, this), "mouseleave.owl.autoplay": a.proxy(function() { this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play() }, this), "touchstart.owl.core": a.proxy(function() { this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause() }, this), "touchend.owl.core": a.proxy(function() { this._core.settings.autoplayHoverPause && this.play() }, this) }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options) };
    e.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }, e.prototype.play = function(a, b) { this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval()) }, e.prototype._getNextTimeout = function(d, e) { return this._timeout && b.clearTimeout(this._timeout), b.setTimeout(a.proxy(function() { this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed) }, this), d || this._core.settings.autoplayTimeout) }, e.prototype._setAutoPlayInterval = function() { this._timeout = this._getNextTimeout() }, e.prototype.stop = function() { this._core.is("rotating") && (b.clearTimeout(this._timeout), this._core.leave("rotating")) }, e.prototype.pause = function() { this._core.is("rotating") && (this._paused = !0) }, e.prototype.destroy = function() { var a, b;
        this.stop(); for (a in this._handlers) this._core.$element.off(a, this._handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e }(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) { "use strict"; var e = function(b) { this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }, this._handlers = { "prepared.owl.carousel": a.proxy(function(b) { b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>") }, this), "added.owl.carousel": a.proxy(function(a) { a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop()) }, this), "remove.owl.carousel": a.proxy(function(a) { a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1) }, this), "changed.owl.carousel": a.proxy(function(a) { a.namespace && "position" == a.property.name && this.draw() }, this), "initialized.owl.carousel": a.proxy(function(a) { a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation")) }, this), "refreshed.owl.carousel": a.proxy(function(a) { a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")) }, this) }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers) };
    e.Defaults = { nav: !1, navText: ["prev", "next"], navSpeed: !1, navElement: "div", navContainer: !1, navContainerClass: "owl-nav", navClass: ["owl-prev", "owl-next"], slideBy: 1, dotClass: "owl-dot", dotsClass: "owl-dots", dots: !0, dotsEach: !1, dotsData: !1, dotsSpeed: !1, dotsContainer: !1 }, e.prototype.initialize = function() { var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) { this.prev(c.navSpeed) }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) { this.next(c.navSpeed) }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) { var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed) }, this)); for (b in this._overrides) this._core[b] = a.proxy(this[b], this) }, e.prototype.destroy = function() { var a, b, c, d; for (a in this._handlers) this.$element.off(a, this._handlers[a]); for (b in this._controls) this._controls[b].remove(); for (d in this.overides) this._core[d] = this._overrides[d]; for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null) }, e.prototype.update = function() { var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items; if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; e > a; a++) { if (b >= h || 0 === b) { if (this._pages.push({ start: Math.min(f, a - d), end: a - d + h - 1 }), Math.min(f, a - d) === f) break;
                    b = 0, ++c }
                b += this._core.mergers(this._core.relative(a)) } }, e.prototype.draw = function() { var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : 0 > b && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active")) }, e.prototype.onTrigger = function(b) { var c = this._core.settings;
        b.page = { index: a.inArray(this.current(), this._pages), count: this._pages.length, size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items) } }, e.prototype.current = function() { var b = this._core.relative(this._core.current()); return a.grep(this._pages, a.proxy(function(a, c) { return a.start <= b && a.end >= b }, this)).pop() }, e.prototype.getPosition = function(b) { var c, d, e = this._core.settings; return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c }, e.prototype.next = function(b) { a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b) }, e.prototype.prev = function(b) { a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b) }, e.prototype.to = function(b, c, d) { var e;!d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c) }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e }(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) { "use strict"; var e = function(c) { this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = { "initialized.owl.carousel": a.proxy(function(c) { c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation") }, this), "prepared.owl.carousel": a.proxy(function(b) { if (b.namespace) { var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash"); if (!c) return;
                    this._hashes[c] = b.content } }, this), "changed.owl.carousel": a.proxy(function(c) { if (c.namespace && "position" === c.property.name) { var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function(a, b) { return a === d ? b : null }).join(); if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e } }, this) }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) { var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0) }, this)) };
    e.Defaults = { URLhashListener: !1 }, e.prototype.destroy = function() { var c, d;
        a(b).off("hashchange.owl.navigation"); for (c in this._handlers) this._core.$element.off(c, this._handlers[c]); for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null) }, a.fn.owlCarousel.Constructor.Plugins.Hash = e }(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) { var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1); return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) { return g[b] !== d ? (e = c ? b : !0, !1) : void 0 }), e }

    function f(a) { return e(a, !0) } var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = { transition: { end: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" } }, animation: { end: { WebkitAnimation: "webkitAnimationEnd", MozAnimation: "animationend", OAnimation: "oAnimationEnd", animation: "animationend" } } },
        j = { csstransforms: function() { return !!e("transform") }, csstransforms3d: function() { return !!e("perspective") }, csstransitions: function() { return !!e("transition") }, cssanimations: function() { return !!e("animation") } };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d()) }(window.Zepto || window.jQuery, window, document);