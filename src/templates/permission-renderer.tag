<permission-renderer>
    <div class="panel panel-success">
        <input class="collapse" id={opts.permission['@id']} type="checkbox" >
        <label class="panel-heading" for={opts.permission['@id']}> <span description={description(opts.permission)} class="description"><h3 description="More">{name(opts.permission)}</h3></span></label>
        <div class="panel-body">
            <div if={opts.permission['http://www.w3.org/ns/odrl/2/constraint']}>
                <h3>If the asset</h3>
                <ul class="list-group">
                    <li class="list-group-item list-group-item-success" each={constraint in opts.permission['http://www.w3.org/ns/odrl/2/constraint']}>
                        <constraint-renderer ontology={parent.opts.ontology} policy={parent.opts.policy} constraint={parent.opts.policy.constraint[constraint['@id']]}/>
                    </li>
                </ul>
            </div>
            <div if={opts.permission['http://www.w3.org/ns/odrl/2/duty']}>
                <h3>Provided that you</h3>
                <ul class="list-group">
                    <li class="list-group-item list-group-item-info" each={duty in opts.permission['http://www.w3.org/ns/odrl/2/duty']}>
                        <duty-renderer ontology={parent.opts.ontology} policy={parent.opts.policy} duty={parent.opts.policy.duty[duty['@id']]} />
                    </li>
                </ul>
            </div>
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
</permission-renderer>