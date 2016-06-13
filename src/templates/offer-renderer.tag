<offer-renderer>
    <div class="container">
        <header class="jumbotron">
          <div class="container">
              <h1>{opts.policy.offer['http://purl.org/dc/terms/title'][0]['@value']}</h1>
              <raw content="{opts.policy.offer['http://openpermissions.org/ns/op/1.1/policyDescription'][0]['@value']}"/>
          </div>
        </header>

        <div class="body">
            <input id="summary" type="radio" name="tabs" checked>
            <label class="nav" for="summary">Licence Summary</label>

            <input id="full-text" type="radio" name="tabs">
            <label class="nav" for="full-text">Full Licence Text</label>

            <div class="content">
                <div id="summary-content">
                    <div if={opts.policy.offer['http://www.w3.org/ns/odrl/2/duty']}>
                        <h1>You Must</h1>
                        <div class="panel panel-info" each={duty in opts.policy.offer['http://www.w3.org/ns/odrl/2/duty']}>
                            <div class="panel-heading">
                                <duty-renderer ontology={parent.opts.ontology} policy={parent.opts.policy} duty={parent.opts.policy.duty[duty['@id']]} />
                            </div>
                        </div>
                    </div>
                    <div class="col left">
                        <h1>You Can</h1>
                        <div each={permission in opts.policy.offer['http://www.w3.org/ns/odrl/2/permission']}>
                            <permission-renderer ontology={parent.opts.ontology} policy={parent.opts.policy} permission={parent.opts.policy.permission[permission['@id']]} />
                        </div>
                    </div>
                    <div class="col right">
                        <h1>You Cannot</h1>
                        <div each={prohibition in opts.policy.offer['http://www.w3.org/ns/odrl/2/prohibition']}>
                            <prohibition-renderer ontology={parent.opts.ontology} policy={parent.opts.policy} prohibition={parent.opts.policy.prohibition[prohibition['@id']]} />
                        </div>
                    </div>
                </div>
                <div id="full-text-content" class="text-block">
                    {opts.policy.offer['http://openpermissions.org/ns/op/1.1/policyText'][0]['@value']}
                </div>
            </div>
            <div class="panel panel-default copyright">
                <div class="panel-heading"</div>
                    © Open Permissions Platform Coalition 2016.
                </div>
            </div>
        </div>
    </div>

</offer-renderer>

<raw>
  <span></span>
  <script>
    this.root.innerHTML = opts.content;
  </script>
</raw>
