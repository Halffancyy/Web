$(document).ready(function() {
    
    // Initial setup: hide all sections except the first one
    $('.section').hide();
    $('#hyperlinks-concept').show();

    // AJAX example for loading a quote from an API
    $('#load-quote').click(function() {
        $.ajax({
            url: 'https://api.quotable.io/random',
            success: function(data) {
                $('#quote').html(`<p>${data.content} — ${data.author}</p>`);
            },
            error: function() {
                $('#quote').html('<p>Failed to retrieve quote.</p>');
            }
        });
    });

    // 'Learn More' button
    $('#learn-more-btn').click(function() {
        $('#splash-screen').hide();
        $('#main-content').show();
    });

    // Navigation links setup
    $('.navbar-nav .nav-link').click(function(e) {
        e.preventDefault();
        var sectionId = $(this).attr('href');
        $('.section').hide();
        $(sectionId).show();
    });
    
});

// Function to check the quiz answer
function checkAnswer(formId, correctValue, resultId) {
    const quiz = document.querySelector(`input[name="${formId}"]:checked`);
    const resultDiv = document.getElementById(resultId);

    if (!quiz) {
        resultDiv.textContent = 'Please select an option. (❁´◡`❁)';
        resultDiv.style.color = 'red';
        return;
    }

    let message = "Almost there, keep going! (´▽`ʃ♡ƪ)";
    let color = 'red';

    if (quiz.value === correctValue) {
        message = "Excellent work! You've got it! ( •̀ ω •́ )✧";
        color = 'green';
    }

    resultDiv.textContent = message;
    resultDiv.style.color = color;
}


// Function to show details for a specific year
function showYearDetails(year) {

    document.querySelectorAll('.event-details').forEach(function(detail) {
        detail.style.display = 'none';
    });

    const selectedDetail = document.getElementById('event' + year);
    if (selectedDetail) {
        selectedDetail.style.display = 'block';
    }
}

// Click to switch to the next year's events
function nextYear() {

    const visibleEvent = document.querySelector('.event-details[style="display: block;"]');
    let nextEvent = visibleEvent.nextElementSibling;

    while (nextEvent && !nextEvent.classList.contains('event-details')) {
        nextEvent = nextEvent.nextElementSibling;
    }

    if (nextEvent) {
        showYearDetails(nextEvent.id.replace('event', ''));
    } else {

        const firstEvent = document.querySelector('.event-details');
        showYearDetails(firstEvent.id.replace('event', ''));
    }
}

// Click to switch image
function swapImage() {
    var mainImage = document.getElementById('mainImage');
    if (mainImage.src.includes('Ambassadors.jpg')) {
        mainImage.src = 'Ambassador-ShijunSHAO.jpg';
    } else {
        mainImage.src = 'Ambassadors.jpg';
    }
}

// Drag and drop game
document.querySelectorAll('.description').forEach(item => {
    item.addEventListener('dragstart', dragStart); // Initialize dragging
    item.addEventListener('dragend', dragEnd); // Clean
});

document.querySelectorAll('.hobby').forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
});

let correctMatches = 0;

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const descriptionId = event.dataTransfer.getData('text/plain');
    const description = document.getElementById(descriptionId);
    if ((event.target.id === 'coding' && descriptionId === 'createSoftware') ||
        (event.target.id === 'gaming' && descriptionId === 'plantsVsZombies') ||
        (event.target.id === 'photography' && descriptionId === 'takePhotos')) {
        event.target.appendChild(description);
        description.draggable = false;
        description.style.background = '#ccffcc';
        correctMatches++;
        if (correctMatches === 3) {
            showMessage("Wow, you guessed all my hobbies correctly! 🎉"); // All matches successful
        } else {
            showMessage("Wow, you guessed one of my hobbies correctly! 🥳"); // Successfully matched one of them
        }
    } else {
        description.style.background = '#ffcccc';
        showMessage("Think again, you're almost there to guessing my hobbies! 💪"); // Any one did not match successfully
    }
}

function dragEnter(event) {
    if (event.target.className === 'hobby') {
        event.target.style.background = '#f0f0f0';
    }
}

function dragLeave(event) {
    if (event.target.className === 'hobby') {
        event.target.style.background = '';
    }
}

// Message for correct or incorrect answers
function showMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
}






