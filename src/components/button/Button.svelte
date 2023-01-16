<!-- <script></script> -->
<script lang="ts" context="module">
  export type Props = { color: string; size: string };
</script>

<script lang="ts">
  export let color: string = '#fff';
  export let size: string = 'sm';
  export let text: string;
  export let onClickF: Function;

  //   let fontSize = '10px';
  //   let fontWeight = 'bold';
  //   let lineHeight = 1.5;

  //   if (size === 'sm') {
  //     fontSize = '10px';
  //   }
  //   if (size === 'lg') {
  //     fontSize = '16px';
  //   }
</script>

<div>
  <button
    on:click={() => {
      if (onClickF) {
        console.log('button click');
        onClickF();
      }
    }}
    style={`background-color: ${color};`}
    class={`${size === 'sm' ? 'sm text-[10px]' : ''}${
      size === 'lg' ? 'lg text-[20px]' : ''
    } border-dark-900 border-[1px] border-solid px-2 py-2 text-white`}
    >{text}{#if !text}<slot />{/if}</button
  >
</div>
