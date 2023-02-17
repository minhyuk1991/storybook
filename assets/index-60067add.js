import{S as c,i as h,s as p,e as v,a as g,b as i,n as o,d as r,c as z,m as j,t as x,f as b,g as m,h as w}from"./index-f2ca03d8.js";import{L as u}from"./Layout-0c2e1395.js";import{c as f}from"./mockData-2ff34739.js";class y{constructor(t,l){this.items=t,this.columns=t.length>0?Object.keys(t[0]):[],this.renderRows=new Map,this.renderColumns=[];const s=t[0];if(s)for(const e in s)Object.prototype.hasOwnProperty.call(s,e)&&this.renderColumns.push(e);t.forEach(e=>{if(typeof e.id!="string")throw new Error("item.id is not string");typeof e.id=="string"&&this.renderRows.set(e.id,e)})}getRenderRowList(){return this.renderRows}getRenderColumnList(){return this.renderColumns}setColumnOption(t){t.map(l=>{})}_setRenderList(){}_rowChange(){}_columnChange(){}_columnFloat(){}_columnDown(){}_columnMove(){}columnChange(){}}function _(d){let t;return{c(){t=v("div"),t.innerHTML=`<div class="dataTables_scrollHead" style="overflow: hidden; position: relative; border: 0px; width: 100%;"><div class="dataTables_scrollHeadInner" style="box-sizing: content-box; width: 1071.56px; padding-right: 0px;"><table class="display nowrap dataTable no-footer" style="width: 1071.56px; margin-left: 0px;"><thead class="svelte-4jzh46"><tr class="svelte-4jzh46"><th class="sorting sorting_asc svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 72.8281px;" aria-sort="ascending" aria-label="First name: activate to sort column descending">First name</th><th class="sorting svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 71.2344px;" aria-label="Last name: activate to sort column ascending">Last name</th><th class="sorting svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 175px;" aria-label="Position: activate to sort column ascending">Position</th><th class="sorting svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 76.0469px;" aria-label="Office: activate to sort column ascending">Office</th><th class="sorting svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 27.2188px;" aria-label="Age: activate to sort column ascending">Age</th><th class="sorting svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 66.4219px;" aria-label="Start date: activate to sort column ascending">Start date</th><th class="sorting svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 56.0781px;" aria-label="Salary: activate to sort column ascending">Salary</th><th class="sorting svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 35.2188px;" aria-label="Extn.: activate to sort column ascending">Extn.</th><th class="sorting svelte-4jzh46" tabindex="0" aria-controls="example" rowspan="1" colspan="1" style="width: 167.516px;" aria-label="E-mail: activate to sort column ascending">E-mail</th></tr> 
                </thead></table></div></div><div class="dataTables_scrollBody" style="position: relative; overflow: auto; width: 100%;"><table id="example" class="display nowrap dataTable no-footer" style="width: 100%;" aria-describedby="example_info"><thead class="svelte-4jzh46"><tr style="height: 0px;" class="svelte-4jzh46"><th class="sorting sorting_asc svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 72.8281px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-sort="ascending" aria-label="First name: activate to sort column descending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">First name</div></th><th class="sorting svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 71.2344px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Last name: activate to sort column ascending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Last name</div></th><th class="sorting svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 175px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Position: activate to sort column ascending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Position</div></th><th class="sorting svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 76.0469px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Office: activate to sort column ascending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Office</div></th><th class="sorting svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 27.2188px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Age: activate to sort column ascending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Age</div></th><th class="sorting svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 66.4219px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Start date: activate to sort column ascending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Start date</div></th><th class="sorting svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 56.0781px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Salary: activate to sort column ascending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Salary</div></th><th class="sorting svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 35.2188px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="Extn.: activate to sort column ascending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">Extn.</div></th><th class="sorting svelte-4jzh46" aria-controls="example" rowspan="1" colspan="1" style="width: 167.516px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" aria-label="E-mail: activate to sort column ascending"><div class="dataTables_sizing" style="height: 0px; overflow: hidden;">E-mail</div></th></tr></thead> 

            <tbody class="svelte-4jzh46"><tr class="odd svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Airi</td> 
                    <td class="svelte-4jzh46">Satou</td> 
                    <td class="svelte-4jzh46">Accountant</td> 
                    <td class="svelte-4jzh46">Tokyo</td> 
                    <td class="svelte-4jzh46">33</td> 
                    <td class="svelte-4jzh46">2008-11-28</td> 
                    <td class="svelte-4jzh46">$162,700</td> 
                    <td class="svelte-4jzh46">5407</td> 
                    <td class="svelte-4jzh46">a.satou@datatables.net</td> 
                </tr><tr class="even svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Angelica</td> 
                    <td class="svelte-4jzh46">Ramos</td> 
                    <td class="svelte-4jzh46">Chief Executive Officer (CEO)</td> 
                    <td class="svelte-4jzh46">London</td> 
                    <td class="svelte-4jzh46">47</td> 
                    <td class="svelte-4jzh46">2009-10-09</td> 
                    <td class="svelte-4jzh46">$1,200,000</td> 
                    <td class="svelte-4jzh46">5797</td> 
                    <td class="svelte-4jzh46">a.ramos@datatables.net</td> 
                </tr><tr class="odd svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Ashton</td> 
                    <td class="svelte-4jzh46">Cox</td> 
                    <td class="svelte-4jzh46">Junior Technical Author</td> 
                    <td class="svelte-4jzh46">San Francisco</td> 
                    <td class="svelte-4jzh46">66</td> 
                    <td class="svelte-4jzh46">2009-01-12</td> 
                    <td class="svelte-4jzh46">$86,000</td> 
                    <td class="svelte-4jzh46">1562</td> 
                    <td class="svelte-4jzh46">a.cox@datatables.net</td> 
                </tr><tr class="even svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Bradley</td> 
                    <td class="svelte-4jzh46">Greer</td> 
                    <td class="svelte-4jzh46">Software Engineer</td> 
                    <td class="svelte-4jzh46">London</td> 
                    <td class="svelte-4jzh46">41</td> 
                    <td class="svelte-4jzh46">2012-10-13</td> 
                    <td class="svelte-4jzh46">$132,000</td> 
                    <td class="svelte-4jzh46">2558</td> 
                    <td class="svelte-4jzh46">b.greer@datatables.net</td> 
                </tr><tr class="odd svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Brenden</td> 
                    <td class="svelte-4jzh46">Wagner</td> 
                    <td class="svelte-4jzh46">Software Engineer</td> 
                    <td class="svelte-4jzh46">San Francisco</td> 
                    <td class="svelte-4jzh46">28</td> 
                    <td class="svelte-4jzh46">2011-06-07</td> 
                    <td class="svelte-4jzh46">$206,850</td> 
                    <td class="svelte-4jzh46">1314</td> 
                    <td class="svelte-4jzh46">b.wagner@datatables.net</td> 
                </tr><tr class="even svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Brielle</td> 
                    <td class="svelte-4jzh46">Williamson</td> 
                    <td class="svelte-4jzh46">Integration Specialist</td> 
                    <td class="svelte-4jzh46">New York</td> 
                    <td class="svelte-4jzh46">61</td> 
                    <td class="svelte-4jzh46">2012-12-02</td> 
                    <td class="svelte-4jzh46">$372,000</td> 
                    <td class="svelte-4jzh46">4804</td> 
                    <td class="svelte-4jzh46">b.williamson@datatables.net</td> 
                </tr><tr class="odd svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Bruno</td> 
                    <td class="svelte-4jzh46">Nash</td> 
                    <td class="svelte-4jzh46">Software Engineer</td> 
                    <td class="svelte-4jzh46">London</td> 
                    <td class="svelte-4jzh46">38</td> 
                    <td class="svelte-4jzh46">2011-05-03</td> 
                    <td class="svelte-4jzh46">$163,500</td> 
                    <td class="svelte-4jzh46">6222</td> 
                    <td class="svelte-4jzh46">b.nash@datatables.net</td> 
                </tr><tr class="even svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Caesar</td> 
                    <td class="svelte-4jzh46">Vance</td> 
                    <td class="svelte-4jzh46">Pre-Sales Support</td> 
                    <td class="svelte-4jzh46">New York</td> 
                    <td class="svelte-4jzh46">21</td> 
                    <td class="svelte-4jzh46">2011-12-12</td> 
                    <td class="svelte-4jzh46">$106,450</td> 
                    <td class="svelte-4jzh46">8330</td> 
                    <td class="svelte-4jzh46">c.vance@datatables.net</td> 
                </tr><tr class="odd svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Cara</td> 
                    <td class="svelte-4jzh46">Stevens</td> 
                    <td class="svelte-4jzh46">Sales Assistant</td> 
                    <td class="svelte-4jzh46">New York</td> 
                    <td class="svelte-4jzh46">46</td> 
                    <td class="svelte-4jzh46">2011-12-06</td> 
                    <td class="svelte-4jzh46">$145,600</td> 
                    <td class="svelte-4jzh46">3990</td> 
                    <td class="svelte-4jzh46">c.stevens@datatables.net</td> 
                </tr><tr class="even svelte-4jzh46"><td class="sorting_1 svelte-4jzh46">Cedric</td> 
                    <td class="svelte-4jzh46">Kelly</td> 
                    <td class="svelte-4jzh46">Senior Javascript Developer</td> 
                    <td class="svelte-4jzh46">Edinburgh</td> 
                    <td class="svelte-4jzh46">22</td> 
                    <td class="svelte-4jzh46">2012-03-29</td> 
                    <td class="svelte-4jzh46">$433,060</td> 
                    <td class="svelte-4jzh46">6224</td> 
                    <td class="svelte-4jzh46">c.kelly@datatables.net</td></tr></tbody></table></div>`,g(t,"class","dataTables_scroll")},m(l,s){i(l,t,s)},p:o,i:o,o,d(l){l&&r(t)}}}function $(d){let t=f(400),e=[...new y(t,{resizable:!0}).getRenderRowList()].map(a=>a[1]).map(a=>Object.values(a));return console.log(e),[]}class S extends c{constructor(t){super(),h(this,t,$,_,p,{})}}function T(d){let t,l,s,e;return s=new S({}),{c(){t=v("p"),t.textContent="Main page",l=w(),z(s.$$.fragment),g(t,"class","text-[400px]")},m(a,n){i(a,t,n),i(a,l,n),j(s,a,n),e=!0},p:o,i(a){e||(x(s.$$.fragment,a),e=!0)},o(a){b(s.$$.fragment,a),e=!1},d(a){a&&r(t),a&&r(l),m(s,a)}}}function L(d){let t,l;return t=new u({props:{$$slots:{default:[T]},$$scope:{ctx:d}}}),{c(){z(t.$$.fragment)},m(s,e){j(t,s,e),l=!0},p(s,[e]){const a={};e&1&&(a.$$scope={dirty:e,ctx:s}),t.$set(a)},i(s){l||(x(t.$$.fragment,s),l=!0)},o(s){b(t.$$.fragment,s),l=!1},d(s){m(t,s)}}}class O extends c{constructor(t){super(),h(this,t,null,L,p,{})}}export{O as default};
