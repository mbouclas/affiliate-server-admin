<script lang="ts">
    import {afterUpdate, beforeUpdate, onDestroy, onMount, tick} from "svelte";
    import {  Label, Helper } from 'flowbite-svelte';
    export let model;
    export let id = 'mytextarea';
    export let useDarkMode = true;
    export let plugins = 'autoresize preview importcss searchreplace autolink save directionality code visualblocks visualchars fullscreen image link media  codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount charmap quickbars emoticons';
    export let toolbar =  'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media  link anchor codesample';
    let pristine = true;
    export let helperText = '';
    export let field = {};
    let hasError = false,
    ready = typeof tinymce !== 'undefined';
    async function init() {
        await tinymce.init({
            selector: `#${id}`,
            setup: (editor) => {
                editor.on('init', (e) => {
                    // console.log('The Editor has initialized.', `#${id}`);
                });
                editor.on('Change', (e) => {
                    model = editor.getContent();
                });

                editor.on('keyup', (e) => {
                    model = editor.getContent();
                });
            },
            toolbar_sticky: true,
            image_advtab: true,
            image_caption: true,
            plugins,
            toolbar,
            autosave_ask_before_unload: true,
            autosave_interval: '30s',
            autosave_prefix: '{path}{query}-{id}-',
            autosave_restore_when_empty: false,
            autosave_retention: '2m',
            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            toolbar_mode: 'sliding',
            contextmenu: 'link image table',
            skin: useDarkMode ? 'oxide-dark' : 'oxide',
            content_css: useDarkMode ? 'dark' : 'default',
        })
    }

    onDestroy(() => {
        const script = document.querySelector(`#${id}-script`);
        tinymce = undefined;
        if(script) {
            script.remove();
        }
    });

    function fetchLibrary() {
        if(typeof tinymce !== 'undefined') {
            ready = true;
            return;
        }

        const script = document.createElement('script');
        script.id = `${id}-script`
        script.type = "text/javascript";
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.5.1/tinymce.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        script.addEventListener("load", (event) => {
            ready = true;
        });

    }

    $: {
        if (ready && typeof tinymce !== 'undefined') {
            setTimeout(() => {
                init();
            });
        } else {
            fetchLibrary()
        }
    }

</script>

<div class="mb-6">
    {#if field.label}
        <Label class={`block mb-2 !text-gray-400 ${hasError ? "has-error" : ""}`}>
            {field.label}
        </Label>
    {/if}

    <div class={`${hasError ? "has-error" : ""}`}>
        <textarea id={id}>{model}</textarea>
    </div>
    {#if helperText}
        <Helper class={hasError ? "helper-text has-error" : "helper-text"}>
            {helperText}
        </Helper>
    {/if}
</div>


