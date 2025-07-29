import React from "react";
import he from 'he';

const RenderEditorContent = ({ data }) => {
    if (!data || !data.blocks) return null;

    function decodeHTMLEntities(str) {
        return he.decode(str);
        /*const textarea = document.createElement("textarea");
        textarea.innerHTML = str;
        return textarea.value;*/
    }


    return (
        <div>
            {data.blocks.map((block, index) => {
                switch (block.type) {
                    case "header":
                        return React.createElement(`h${block.data.level}`, { key: index }, block.data.text);

                    case "paragraph":
                        return <p key={index} dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(block.data.text) }}></p>;

                    case "list":
                        return (
                            <ul key={block.id}>
                                {block.data.items.map((item, index) => (
                                    <li key={index}  dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(item.content) }}></li>
                                ))}
                            </ul>
                        );

                    case "image":
                        return (
                            <figure key={index}>
                                <img src={block.data.file.url} alt={block.data.caption || "Image"} style={{ maxWidth: "100%" }} />
                                {block.data.caption && <figcaption>{block.data.caption}</figcaption>}
                            </figure>
                        );

                    case "quote":
                        return (
                            <blockquote key={index}>
                                <p>{block.data.text}</p>
                                {block.data.caption && <cite>- {block.data.caption}</cite>}
                            </blockquote>
                        );

                    case "code":
                        return (
                            <pre key={index}>
                                <code>{block.data.code}</code>
                            </pre>
                        );

                    case "table":
                        return (
                            <table key={index} border="1">
                                <tbody>
                                    {block.data.content.map((row, i) => (
                                        <tr key={i}>
                                            {row.map((cell, j) => (
                                                <td key={j}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );

                    case "checklist":
                        return (
                            <ul key={index} style={{ listStyle: "none" }}>
                                {block.data.items.map((item, i) => (
                                    <li key={i}>
                                        <input type="checkbox" checked={item.checked} readOnly /> {item.text}
                                    </li>
                                ))}
                            </ul>
                        );

                    case "delimiter":
                        return <hr key={index} />;

                    case "embed":
                        return (
                            <div key={index} style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                                <iframe
                                    src={block.data.embed}
                                    title={block.data.caption || "Embedded Content"}
                                    width="100%"
                                    height="100%"
                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default RenderEditorContent;
