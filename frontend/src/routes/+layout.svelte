<script>
    import "../app.scss";
import Header from "../components/Header.svelte";
import Footer from "../components/Footer.svelte";
import Sidebar from "../components/Sidebar.svelte";
</script>

<Header></Header>

<Sidebar></Sidebar>

<main class="py-[4rem]">
    <slot></slot>
</main>

<Footer></Footer>

<style>

</style>
