class ChatUI {
    constructor(list) {
        this.list = list
    }

    clear() {
        this.list.innerHTML = "";
    }

    render(data) {
        this.list.innerHTML = data.map((data) =>
            `
            <li class =" list-group-item">
                <span class ="username">${data.username}</span>
                <span class ="message">${data.message}</span>               
                <div class = "time">${data.created_at && time(data.created_at?.toDate().getTime())}</div>
            </li>
            `
        ).join("")
    }

}

const time = (time_message) => {
    const now = new Date();
    const sekonds = Math.round((now.getTime() - time_message) / 1000 + 1);
    const minets = Math.round(sekonds / 60);
    const hours = Math.round(minets / 60);
    const days = Math.round(hours / 24);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);
    let s = sekonds;
    let m = minets;
    let h = hours;
    while (h > 24) {
        h = Math.round(h / 24);
    }
    while (m > 60) {
        m = Math.round(m / 24);
    }
    while (s > 60) {
        s = Math.round(s / 24);
    }
    if (years >= 1) {
        if (years > 1) {
            return `${years} years ago `
        } else {
            return `${years} year ago `
        }
    } else if (months >= 1) {
        if (months > 1) {
            return `${months} months ago `
        } else {
            return `${months} month ago `
        }
    } else if (days >= 1) {
        if (days > 1) {
            return `${days} days ago `
        } else {
            return `${days} day ago `
        }
    } else if (hours >= 1) {
        return `${h} h ${m} m ${s} s ago `
    } else if (minets >= 1) {
        return `${m} m ${s} s ago `
    } else if (sekonds === 0) {
        return `Just now `
    } else {
        return `${s} s ago `
    }
}


