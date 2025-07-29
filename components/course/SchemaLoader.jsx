import React, { useEffect, useMemo } from 'react';

const SchemaLoader = React.memo(({ slug }) => {
        const sanitizedSlug = useMemo(() => slug?.replace(/\s*/g, "").replace(/\//g, "_"), [slug]);
    const schemaFile = useMemo(() => `${sanitizedSlug}.json`, [sanitizedSlug]);

    if (!slug) {
        return null; // Return null if slug is not provided
    }
    useEffect(() => {
        let injectedScriptIds = [];

        const loadSchema = async () => {
            try {
                const response = await fetch(`/schemas/${schemaFile}`);
                if (!response.ok) {
                    // File does not exist or fetch failed
                    return;
                }
                const schemas = (await response.json()) ?? [];
                const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

                schemaArray.forEach((schema, index) => {
                    const scriptId = `schema-jsonld-${slug}-${index}`;
                    injectedScriptIds.push(scriptId);

                    if (!document.getElementById(scriptId)) {
                        const script = document.createElement('script');
                        script.id = scriptId;
                        script.type = 'application/ld+json';
                        script.textContent = JSON.stringify(schema);
                        document.head.appendChild(script);
                    }
                });
            } catch (error) {
                // Handle fetch or JSON parse errors gracefully
                // Optionally log error
            }
        };

        loadSchema();

        // Cleanup previously added scripts
        return () => {
            injectedScriptIds.forEach((id) => {
                const existingScript = document.getElementById(id);
                if (existingScript) {
                    document.head.removeChild(existingScript);
                }
            });
        };
    }, [schemaFile, sanitizedSlug]);
});

export default SchemaLoader;