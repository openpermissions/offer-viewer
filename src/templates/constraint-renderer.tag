<constraint-renderer>
    <div if={!opts.duty_attribute} description={description(opts.constraint)} class="description"><span description="More"><strong>{name(opts.constraint)}</strong> is</span></div>
    <span if={!opts.duty_attribute}> {operator(opts.constraint)}</span>
    {value(opts.constraint)}
    <script>
        const helper = require('../helper')

        name(constraint){
            return helper.constraintName(constraint, opts.ontology)
        }

        description(constraint){
            return helper.constraintDescription(constraint, opts.ontology)
        }

        value(constraint){
            return helper.constraintValue(constraint, opts.ontology)
        }

        operator(constraint){
            return helper.operatorName(constraint, opts.ontology)
        }
    </script>
</constraint-renderer>