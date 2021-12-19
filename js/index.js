arrbulan = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
date = new Date()
tanggal = date.getDate();
bulan = date.getMonth();
tahun = date.getFullYear()
let hariini = tahun + '-' + arrbulan[bulan] + '-' + ((tanggal < 10) ? '0' + tanggal : tanggal)
// console.log(hariini);



$('#list-kota').on('click', function () {
    // console.log('hey')

    $.ajax({
        url: 'https://api.banghasan.com/sholat/format/json/kota',
        type: 'get',
        dataType: 'json',

        success: function (result) {
            // console.log(result.kota);
            let kota = result.kota;

            $.each(kota, function (i, data) {
                $('#kota').append(`
                <option id="p" class="kot" data-id="`+ data.id + `" value="` + data.nama + `">` + data.nama + `</option>
                `)
            })
            // <option id="p" class="kot" data-id="`+ data.id + `" value="` + data.id + `">` + data.nama + `</option>
        }
    })
})


let jadwal = $.ajax({
    url: `https://api.banghasan.com/sholat/format/json/jadwal/kota/681/tanggal/${hariini}`,
    type: 'get',
    dataType: 'json',

    success: function (result) {
        // console.log('bekasi', result.jadwal.data);
        let waktuSholat = result.jadwal.data;


        $('#waktu').html(`
                <li class="list-group-item d-flex justify-content-between list-group-item-secondary">
                    <p>Shubuh</p>
                    <p id="subuh">`+ waktuSholat.subuh + `</p>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <p>Dzuhur</p>
                    <p id="dzuhur">`+ waktuSholat.dzuhur + `</p>
                </li>
                <li class="list-group-item d-flex justify-content-between list-group-item-secondary">
                    <p>Ashar</p>
                    <p id="ashar">`+ waktuSholat.ashar + `</p>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <p>Maghrib</p>
                    <p id="maghrib">`+ waktuSholat.maghrib + `</p>
                </li>
                <li class="list-group-item d-flex justify-content-between list-group-item-secondary">
                    <p>Isya</p>
                    <p id="isya">`+ waktuSholat.isya + `</p>
                </li>

            `)
        // console.log(waktuSholat.subuh);
    }
})

$('#kota').change('.kot', function () {
    // console.log($(this).find(':selected').data('id'));

    let id = $(this).find(':selected').data('id')

    // console.log(id);

    $.ajax({
        url: `https://api.banghasan.com/sholat/format/json/jadwal/kota/${id}/tanggal/${hariini}`,
        type: 'get',
        dataType: 'json',

        success: function (data) {
            // console.log(data.jadwal);
            let jadwal = data.jadwal.data

            $('#subuh').html(jadwal.subuh);
            $('#dzuhur').html(jadwal.dzuhur);
            $('#ashar').html(jadwal.ashar);
            $('#maghrib').html(jadwal.maghrib);
            $('#isya').html(jadwal.isya);
            // console.log(p);

        }
    })

    $.ajax({
        url: `https://api.banghasan.com/sholat/format/json/kota/kode/${id}`,
        type: 'get',
        dataType: 'json',

        success: function (data) {
            // console.log(data.kota[0]);
            let kotaterpilih = data.kota[0].nama

            $('#kotaterpilih').html(kotaterpilih);


        }
    })

})