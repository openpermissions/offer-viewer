<duty-renderer>
    <div description={description(opts.duty)} class="description"><span description="More"><strong>{name(opts.duty)}</strong></span></div>
    <span each={constraint in opts.duty['http://www.w3.org/ns/odrl/2/constraint']}>
        <constraint-renderer duty_attribute={true} ontology={parent.opts.ontology} policy={parent.opts.policy} constraint={parent.opts.policy.constraint[constraint['@id']]}/>
    </span>

    <script>
        const helper = require('../helper');

        name(entity){
            return helper.actionName(entity, opts.ontology);
        }
        description(entity){
            return helper.actionDescription(entity, opts.ontology);
        }
    </script>
</duty-renderer>