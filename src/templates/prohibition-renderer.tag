<prohibition-renderer>
    <div class="panel panel-danger">
        <input class="collapse" id={opts.prohibition['@id']} type="checkbox" >
        <label class="panel-heading" for={opts.prohibition['@id']}> <span description={description(opts.prohibition)} class="description"><h3 description="More">{name(opts.prohibition)}</h3></span></label>
        <div if={opts.prohibition['http://www.w3.org/ns/odrl/2/constraint']} class="panel-body">
            <h3>If the asset</h3>
            <ul class="list-group">
                <li class="list-group-item list-group-item-danger" each={constraint in opts.prohibition['http://www.w3.org/ns/odrl/2/constraint']}>
                    <constraint-renderer ontology={parent.opts.ontology} policy={parent.opts.policy} constraint={parent.opts.policy.constraint[constraint['@id']]}/>
                </li>
            </ul>
        </div>
    </div>
    <script>
        const helper = require('../helper');

        name(entity){
            return helper.actionName(entity, opts.ontology);
        }
        description(entity){
            return helper.actionDescription(entity, opts.ontology);
        }
    </script>
</prohibition-renderer>